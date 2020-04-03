/*
 * @Author: liubo
 * @CreatDate: 2018-09-30 17:13:02
 * @Describe: error
 */

import "./index.less";
import React, { PureComponent } from "react";

class Error extends PureComponent {

	render() {

		return (
			<div className="g-404">
				<img className="pic" src={require("./img/404.svg")} alt="" />
			</div>
		);
	}
}

export default Error;
