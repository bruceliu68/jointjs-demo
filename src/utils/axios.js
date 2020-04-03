import axios from "axios";
import qs from "qs";

let service = axios.create({
	withCredentials: true // 允许跨域
});

/* 防止重复提交，利用axios的cancelToken */
let pending = []; // 声明一个数组用于存储每个ajax请求的取消函数和ajax标识
let CancelToken = axios.CancelToken;
let removePending = (config) => {
	const url = config.url.split("?")[0];
	for (let p in pending) {
		if (pending[p].u === `${url}&${config.method}`) { // 当当前请求在数组中存在时执行函数体
			pending[p].f(); // 执行取消操作
			pending.splice(p, 1); // 把这条记录从数组中移除
		}
	}
};

/* request拦截器 */
service.interceptors.request.use((config) => {
	config.url = config.url;
	removePending(config); // 在一个ajax发送前执行一下取消操作
	config.cancelToken = new CancelToken((c) => {
		// 这里的ajax标识我是用请求地址&请求方式拼接的字符串，当然你可以选择其他的一些方式
		const url = config.url.split("?")[0];
		pending.push({ u: `${url}&${config.method}`, f: c });
	});
	return config;
}, (error) => {
	console.log(`【request】${error}`);
	return Promise.reject(error);
});

/* respone拦截器 */
service.interceptors.response.use(
	(response) => {
		removePending(response.config); // 在一个ajax响应后再执行一下取消操作，把已经完成的请求从pending中移除
		return response.data;
	},
	(error) => {
		return Promise.reject(error);
	},
);

service.defaults.paramsSerializer = params => qs.stringify(params, { indices: false });

export default service;
