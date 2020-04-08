/*
 * @Describe: 顶部操作栏模块
 */

import React, { PureComponent } from "react";
import { Icon, Tooltip, Button, Select } from "antd";
import dagre from "dagre";
import graphlib from "graphlib";

const { Option } = Select;

export default class index extends PureComponent {

	state = {
		list: [
			{ name: "放大", icon: "zoom-in" },
			{ name: "缩小", icon: "zoom-out" },
			{ name: "适合", icon: "global" },
			{ name: "还原", icon: "login" },
			{ name: "撤销", icon: "undo" },
			{ name: "重做", icon: "redo" },
			{ name: "清空", icon: "delete" },
			// { name: "打印", icon: "printer" },
			{ name: "保存", icon: "save" },
			{ name: "运行", icon: "play-circle" }
			// { name: "导出svg", icon: "" },
			// { name: "导出png", icon: "" }
		],
		routers: ["normal", "manhattan", "metro", "orthogonal", "oneSide"],
		rankdir: ["TB", "BT", "LR", "RL"]
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
				console.log(operate.save());
				alert(operate.save());
				break;
			case "运行":
				this.run();
				break;
			case "导出svg":
				operate.exportSvg();
				break;
			case "导出png":
				operate.exportPng();
				break;
		}
	}

	// 路由切换
	changeRouter(name) {
		window.lbPaper.options.defaultRouter.name = name;
	}

	// 美化布局
	beautify(item) {
		window.lbPaper.freeze();
		const cells = window.lbGraph.getCells();
		joint.layout.DirectedGraph.layout(cells, {
			dagre: dagre,
			graphlib: graphlib,
			rankDir: item,
			rankSep: 110,
			marginX: 50,
			marginY: 50,
			nodeSep: 80,
			edgeSep: 50
		});
		window.lbPaper.unfreeze();
	}

	// 模拟运行
	run = () => {
		const cells = window.lbGraph.getCells();
		let findFirstLine = cells.find(item => {
			if (item.attributes.source) {
				return item.attributes.source.id === cells[0].id;
			}
		});
		let secondElement = cells.find(item => findFirstLine.attributes.target.id === item.id);

		$(`g[model-id=${findFirstLine.id}]`).addClass("line-running");
		$(`g[model-id=${secondElement.id}]`).addClass("element-running");
	}

	render() {
		const { list, routers, rankdir } = this.state;

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
				<Select defaultValue="normal" style={{ width: 120, marginRight: "10px" }}>
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
				美化布局：
				<Select style={{ width: 80 }} allowClear>
					{
						rankdir.map((item, index) => {
							return (
								<Option value={item} key={index} onClick={() => this.beautify(item)}>
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
