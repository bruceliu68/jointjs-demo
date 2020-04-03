const path = require("path");
const assetsPublicPath = "/";
const PORT = process.env.PORT || 8001;
const sourcePrefix = "lb-resource";
const publicPath = "/lb-resource/";

module.exports = {
	common: {
		htmlTemplatePath: path.resolve(__dirname, "../src/index.html"),
		sourcePrefix: sourcePrefix
	},
	dev: {
		hot: true,
		assetsSubDirectory: sourcePrefix + "/static",
		assetsPublicPath,
		// proxyTable: {
		// 	"/creditApi": {
		// 		"target": "http://10.57.17.87:8099",
		// 		"changeOrigin": true,
		// 		"pathRewrite": {
		// 			"^/creditApi": "/api"
		// 		}
		// 	}
		// },
		port: PORT,
		autoOpenBrowser: true,
		devtool: "eval-source-map",
		publicPath: publicPath
	},
	build: {
		assetsRoot: path.resolve(__dirname, "../dist"),
		assetsSubDirectory: sourcePrefix + "/static",
		assetsPublicPath,
		devtool: "source-map"
	}
};
