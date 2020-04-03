/*
 * @Describe: 首页
 */

import "./index.less";
import React, { PureComponent } from "react";
import LeftPanel from "./LeftPanel";
import ToolBar from "./ToolBar";
import ItemPanels from "./ItemPanels";
import InitData from "./initData";
import Operate from "./ToolBar/operate";
import ContextMenu from "./ToolBar/contextMenu";

class Home extends PureComponent {

	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	state = {
		operate: null,
		selectedModel: null,
		visible: false,
		contextmenuPosition: {
			x: 0,
			y: 0,
			inX: 0,
			inY: 0
		},
		selectedModelClone: null,
		contextMenuType: null
	}

	componentDidMount() {
		const { current } = this.ref;

		let graphWidth = 2000;
		let graphHeight = 1500;

		let graph = new joint.dia.Graph();
		let paper = new joint.dia.Paper({
			el: current,
			model: graph.fromJSON(InitData),
			width: graphWidth,
			height: graphHeight,
			gridSize: 10,
			drawGrid: true,
			background: {
				color: "#fff"
			},
			linkPinning: false, // 连线必须连到某个元素，即不允许连到空白处
			snapLinks: {
				radius: 25 // 距离元素连接点25像素时自动连接上
			}
		});

		// 事件
		// 线配-置按钮点击
		paper.on("link:options", (linkView, evt, x, y) => {
			console.log("link-event", linkView.model);
		});
		// 节点-右击
		paper.on("element:contextmenu", (modelView, evt, x, y) => {
			this.removeElementTools();
			this.setElementTools(graph, paper, modelView.model);
			const { selectedModel } = this.state;
			if (selectedModel) {
				this.setState({
					contextmenuPosition: {
						x: evt.clientX,
						y: evt.clientY,
						inX: x,
						inY: y
					},
					visible: true,
					contextMenuType: "element"
				});
			}
		});
		// 空白-右击
		paper.on("blank:contextmenu", (evt, x, y) => {
			this.removeElementTools();
			const { selectedModelClone } = this.state;
			if (selectedModelClone) {
				this.setState({
					contextmenuPosition: {
						x: evt.clientX,
						y: evt.clientY,
						inX: x,
						inY: y
					},
					visible: true,
					contextMenuType: "blank"
				});
			}
		});
		// 节点-单击
		paper.on("element:pointerclick", (modelView, evt, x, y) => {
			this.removeElementTools();
			this.setElementTools(graph, paper, modelView.model);
			this.closeContextMenu();
		});
		// 空白-单击
		paper.on("blank:pointerclick", (evt, x, y) => {
			this.removeElementTools();
			this.closeContextMenu();
		});
		// 监听键盘事件
		$(document).keydown((event) => {
			if (event.keyCode === 8) { // 删除键
				const { selectedModel } = this.state;
				if (selectedModel) {
					selectedModel.remove();
					this.removeElementTools();
					this.closeContextMenu();
				}
			}
		});

		window.lbPaper = paper;
		window.lbGraph = graph;
		// 设置操作栏事件
		const initOperate = new Operate(graph, paper, current);
		this.setState({ operate: initOperate });
		// 设置导航窗口
		initOperate.initSmallNav();
	}

	setElementTools = (graph, paper, model) => {
		const size = model.attributes.size;

		const linkButton = new joint.elementTools.Button({
			focusOpacity: 0.5,
			x: "100%",
			y: size.height / 2 - 5,
			action: (evt, modelView, toolView) => {
				const model = modelView.model;
				const x = evt.offsetX;
				const y = evt.offsetY;
				let targetCellView = null;

				let link = new joint.shapes.standard.Link();
				link.attr("line/stroke", "#B2BECD");
				link.attr("line/stroke-width", 1);
				link.set("source", { id: model.id });
				link.set("target", { x: x, y: y });
				graph.addCell(link);
				evt.data = { link: link, x: x, y: y };

				document.onmousemove = (e) => {
					evt.data.link.set("target", { x: e.offsetX - 10, y: e.offsetY });
				};
				document.onmouseup = (e) => {
					if (!targetCellView) {
						evt.data.link.remove();
					} else {
						const link2 = new joint.shapes.lb.CustomLink({
							source: { id: model.id },
							target: { id: targetCellView.model.id },
							toolMarkup: [
								"<g class='link-tool'>",
								"<g class='tool-remove' event='remove'>",
								"<circle r='11' />",
								"<path transform='scale(.8) translate(-16, -16)' d='M24.778,21.419 19.276,15.917 24.777,10.415 21.949,7.585 16.447,13.087 10.945,7.585 8.117,10.415 13.618,15.917 8.116,21.419 10.946,24.248 16.447,18.746 21.948,24.248z' />",
								"<title>Remove link.</title>",
								"</g>",
								"<g event='link:options'>",
								"<circle r='11' transform='translate(25)' />",
								"<path fill='white' transform='scale(.55) translate(29, -16)' d='M31.229,17.736c0.064-0.571,0.104-1.148,0.104-1.736s-0.04-1.166-0.104-1.737l-4.377-1.557c-0.218-0.716-0.504-1.401-0.851-2.05l1.993-4.192c-0.725-0.91-1.549-1.734-2.458-2.459l-4.193,1.994c-0.647-0.347-1.334-0.632-2.049-0.849l-1.558-4.378C17.165,0.708,16.588,0.667,16,0.667s-1.166,0.041-1.737,0.105L12.707,5.15c-0.716,0.217-1.401,0.502-2.05,0.849L6.464,4.005C5.554,4.73,4.73,5.554,4.005,6.464l1.994,4.192c-0.347,0.648-0.632,1.334-0.849,2.05l-4.378,1.557C0.708,14.834,0.667,15.412,0.667,16s0.041,1.165,0.105,1.736l4.378,1.558c0.217,0.715,0.502,1.401,0.849,2.049l-1.994,4.193c0.725,0.909,1.549,1.733,2.459,2.458l4.192-1.993c0.648,0.347,1.334,0.633,2.05,0.851l1.557,4.377c0.571,0.064,1.148,0.104,1.737,0.104c0.588,0,1.165-0.04,1.736-0.104l1.558-4.377c0.715-0.218,1.399-0.504,2.049-0.851l4.193,1.993c0.909-0.725,1.733-1.549,2.458-2.458l-1.993-4.193c0.347-0.647,0.633-1.334,0.851-2.049L31.229,17.736zM16,20.871c-2.69,0-4.872-2.182-4.872-4.871c0-2.69,2.182-4.872,4.872-4.872c2.689,0,4.871,2.182,4.871,4.872C20.871,18.689,18.689,20.871,16,20.871z' />",
								"<title>Link options.</title>",
								"</g>",
								"</g>"
							].join("")
						});
						// 添加文本
						// link2.appendLabel({
						// 	attrs: {
						// 		label: {
						// 			text: "自定义线"
						// 		}
						// 	}
						evt.data.link.remove();
						graph.addCell(link2);
						targetCellView.unhighlight();
					}

					document.onmousemove = null;
					document.onmouseup = null;
					this.removeElementTools();
					paper.off("element:mouseover");
					paper.off("element:mouseout");
				};
				paper.on("element:mouseover", (cellView) => {
					targetCellView = cellView;
					cellView.highlight();
				});
				paper.on("element:mouseleave", (cellView) => {
					targetCellView = null;
					cellView.unhighlight();
				});
			},
			markup: [{
				tagName: "rect",
				selector: "button",
				attributes: {
					"fill": "none",
					"stroke": "none",
					"width": 20,
					"height": 10
					// "cursor": "pointer"
				}
			}, {
				tagName: "path",
				selector: "rect",
				attributes: {
					"d": "M 0 6 L 12 6 L 12 2 L 0 2 z",
					"fill": "#000",
					"stroke": "#000",
					"stroke-width": 0
					// "cursor": "pointer"
					// "pointer-events": "none"
				}
			}, {
				tagName: "path",
				selector: "icon",
				attributes: {
					"d": "M 12 7 L 16 4 L 12 1 z",
					"fill": "#000",
					"stroke": "#000",
					"stroke-width": 2
					// "cursor": "pointer",
					// "pointer-events": "none"
				}
			}]
		});
		const removeButton = new joint.elementTools.Remove({
			focusOpacity: 0.5,
			rotate: true,
			x: -10,
			y: -10,
			offset: { x: 0, y: 0 },
			action: (evt, modelView, toolView) => {
				modelView.model.remove({ ui: true, tool: toolView.cid });
				this.removeElementTools();
			},
			markup: [{
				tagName: "circle",
				selector: "button",
				attributes: {
					"r": 8,
					"fill": "#FF1D00",
					"cursor": "pointer"
				}
			}, {
				tagName: "path",
				selector: "icon",
				attributes: {
					"d": "M -3.5 -3.5 3.5 3.5 M -3.5 3.5 3.5 -3.5",
					"fill": "none",
					"stroke": "#FFFFFF",
					"stroke-width": 2,
					"pointer-events": "none"
				}
			}]
		});
		const boundaryTool = new joint.elementTools.Boundary({
			focusOpacity: 0.5,
			padding: 2,
			useModelGeometry: true,
			attributes: {
				"fill": "none",
				"stroke": "#607D8B",
				"stroke-dasharray": "5, 5"
			}
		});
		const view = model.findView(paper);
		const toolsView = new joint.dia.ToolsView({
			name: "basic-tools",
			tools: [removeButton, linkButton, boundaryTool]
		});
		view.addTools(toolsView);
		this.setState({ selectedModel: model });
	}

	removeElementTools = () => {
		$(".joint-tools").remove();
		this.setState({ selectedModel: null });
	}

	closeContextMenu = () => {
		this.setState({ visible: false });
	}

	// 右击菜单点击
	clickMenuItem = (item) => {
		if (item.name === "复制") {
			const { selectedModel } = this.state;
			this.setState({ selectedModelClone: selectedModel.clone() });
			this.removeElementTools();
			this.closeContextMenu();
		} else if (item.name === "粘贴") {
			const { selectedModelClone, contextmenuPosition } = this.state;
			const { inX, inY } = contextmenuPosition;
			selectedModelClone.position(inX, inY);
			window.lbGraph.addCell(selectedModelClone.clone());
			this.removeElementTools();
			this.closeContextMenu();
		}
	}

	render() {
		const { operate, visible, contextmenuPosition, contextMenuType } = this.state;

		return (
			<div className="lb-workflow">
				<LeftPanel />
				<div className="main">
					<div className="main-in">
						<ToolBar operate={operate} />
						<div className="wrap-paper">
							<div ref={this.ref} className="joint-main"></div>
						</div>
					</div>
				</div>
				<ItemPanels />
				<ContextMenu
					visible={visible}
					position={contextmenuPosition}
					type={contextMenuType}
					onClickItem={this.clickMenuItem}
				/>
			</div>
		);
	}
}

export default Home;
