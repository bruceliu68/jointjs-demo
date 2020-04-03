/*
 * @Describe: 顶部操作栏模块
 */

import React, { PureComponent } from "react";
import { Icon, Tooltip, Button, Select } from "antd";
const { Option } = Select;

export default class index extends PureComponent {

	state = {
		list: [
			{ name: "放大", icon: "plus-circle" },
			{ name: "缩小", icon: "minus-circle" },
			{ name: "适合", icon: "global" },
			{ name: "还原", icon: "login" },
			{ name: "撤销", icon: "undo" },
			{ name: "重做", icon: "redo" },
			{ name: "清空", icon: "delete" },
			// { name: "打印", icon: "printer" },
			{ name: "保存", icon: "save" }
			// { name: "导出svg", icon: "" },
			// { name: "导出png", icon: "" }
		],
		routers: ["normal", "manhattan", "metro", "orthogonal", "oneSide"]
	}

	clickItem(type) {
		const { operate } = this.props;

		switch (type) {
			case "放大":
				operate.zoomOut();
				break;
			case "缩小":
				operate.zoomIn();
				break;
			case "适合":
				operate.fit();
				break;
			case "还原":
				operate.reduction();
				break;
			case "撤销":
				operate.undo();
				break;
			case "重做":
				operate.redo();
				break;
			case "清空":
				operate.clear();
				break;
			case "打印":
				operate.print();
				break;
			case "保存":
				alert(operate.save());
				break;
			case "导出svg":
				operate.exportSvg();
				break;
			case "导出png":
				operate.exportPng();
				break;
		}
	}

	changeRouter(name) {
		window.lbPaper.options.defaultRouter.name = name;
	}

	render() {
		const { list, routers } = this.state;

		return (
			<div className="toolbar">
				{
					list.map((item, index) => {
						let dom = (
							<Tooltip title={item.name} key={index}>
								<Icon className="u-icon" type={item.icon} onClick={() => this.clickItem(item.name)} />
							</Tooltip>
						);
						if (!item.icon) {
							dom = (
								<Button
									key={index}
									size="small"
									style={{ marginRight: "5px" }}
									onClick={() => this.clickItem(item.name)}
								>
									{item.name}
								</Button>
							);
						}
						return dom;
					})
				}
				路由模式：
				<Select defaultValue="normal" style={{ width: 120 }}>
					{
						routers.map((item, index) => {
							return (
								<Option value={item} key={index} onClick={() => this.changeRouter(item)}>
									{item}
								</Option>
							);
						})
					}
				</Select>
			</div>
		);
	}
}
