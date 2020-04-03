/*
 * @Describe: 左侧拖拽节点模块
 */

import React, { PureComponent } from "react";

export default class index extends PureComponent {

	constructor(props) {
		super(props);
		this.ref = React.createRef();
	}

	componentDidMount() {
		const { current } = this.ref;

		let stencilGraph = new joint.dia.Graph();
		let stencilPaper = new joint.dia.Paper({
			el: current,
			model: stencilGraph,
			width: 200,
			height: "100%",
			background: {
				color: "transparent"
			},
			interactive: false
		});

		// 画圆
		const circle = new joint.shapes.standard.Circle();
		circle.resize(60, 60);
		circle.position(45, 50);
		circle.attr({
			root: {
				title: "开始节点"
			},
			body: {
				fill: "#f90",
				stroke: "#f90"
			},
			label: {
				text: "开始",
				fill: "white"
			}
		});

		// 画方
		const rect = new joint.shapes.standard.Rectangle();
		rect.resize(100, 40);
		rect.position(25, 150);
		rect.attr({
			body: {
				fill: "#40a9ff",
				stroke: "#1c7fd0",
				rx: 4,
				ry: 4
			},
			label: {
				text: "模型",
				fill: "white"
			}
		});

		// 菱形
		const polygon = new joint.shapes.standard.Polygon();
		polygon.resize(80, 60);
		polygon.position(35, 225);
		polygon.attr({
			body: {
				fill: "#3F51B5",
				stroke: "#26368e",
				refPoints: "0,10 10,0 20,10 10,20"
			},
			label: {
				text: "判断",
				fill: "white"
			}
		});

		// 自定义节点
		joint.dia.Element.define("html.Element",
			{
				attrs: {
					body: {
						refWidth: "100%",
						refHeight: "100%",
						fill: "transparent"
					}
				}
			},
			{
				markup: [{
					tagName: "rect",
					selector: "body"
				}]
			}
		);

		// 创建一个定制的视图,显示HTML div元素
		joint.shapes.html.ElementView = joint.dia.ElementView.extend({

			template: [
				'<div class="my-html-element">',
				'<span data-attribute="mytip" class="dot"></span>',
				'<span data-attribute="mylabel" class="ellipsis"></span>',
				"</div>"
			].join(""),

			init: function () {
				// 监听model变化，跟新box position
				this.listenTo(this.model, "change", this.updateBox);
			},
			onRender: function () {
				if (this.$box) this.$box.remove();
				var boxMarkup = joint.util.template(this.template)();
				var $box = this.$box = $(boxMarkup);
				this.$attributes = $box.find("[data-attribute]");
				// Update the box size and position whenever the paper transformation changes.
				// Note: there is no paper yet on `init` method.
				this.listenTo(this.paper, "scale translate", this.updateBox);
				$box.appendTo(this.paper.el);
				this.updateBox();
				return this;
			},
			updateBox: function () {
				// Set the position and the size of the box so that it covers the JointJS element
				// (taking the paper transformations into account).
				var bbox = this.getBBox({ useModelGeometry: true });
				var scale = this.paper.scale();
				this.$box.css({
					transform: "scale(" + scale.sx + "," + scale.sy + ")",
					transformOrigin: "0 0",
					width: bbox.width / scale.sx,
					height: bbox.height / scale.sy,
					left: bbox.x,
					top: bbox.y
				});

				this.updateAttributes();
			},
			updateAttributes: function () {
				var model = this.model;

				this.$attributes.each(function () {
					var value = model.get(this.dataset.attribute);

					switch (this.tagName.toUpperCase()) {
						case "SPAN":
							this.textContent = value;
							break;
					}
				});
			},
			onRemove: function () {
				if (this.$box) this.$box.remove();
			}

		});
		const customElement = new joint.shapes.html.Element({
			position: { x: 25, y: 320 },
			size: { width: 100, height: 30 },
			mytip: "自",
			mylabel: "自定义节点"
		});

		// 自定义画线
		joint.dia.Link.define("lb.CustomLink", {
			attrs: {
				".connection": {
					stroke: "#B2BECD"
				},
				".marker-target": {
					d: "M 10 0 L 0 5 L 10 10 z",
					fill: "#B2BECD",
					stroke: "#B2BECD"
				}
			},
			defaultLabel: {
				markup: [
					{
						tagName: "rect",
						selector: "body"
					}, {
						tagName: "text",
						selector: "label"
					}
				],
				attrs: {
					label: {
						text: "%", // default label text
						fill: "#000000", // default text color
						fontSize: 14,
						textAnchor: "middle",
						yAlignment: "middle",
						pointerEvents: "none"
					},
					body: {
						ref: "label",
						fill: "#ffffff",
						refWidth: "100%",
						refHeight: "100%",
						rx: 3,
						ry: 3,
						xAlignment: "middle",
						yAlignment: "middle"
					}
				},
				position: {
					distance: 0.5, // place label at midpoint by default
					offset: 0,
					args: {
						absoluteOffset: true // keep offset absolute when moving by default
					}
				}
			}
		});

		stencilGraph.addCell([circle, rect, polygon, customElement]);

		stencilPaper.on("cell:pointerdown", (cellView, e, x, y) => {
			$("body").append('<div id="flyPaper" style="position:fixed;z-index:100;opacity:.7;pointer-event:none;background:transparent"></div>');
			let flyGraph = new joint.dia.Graph();
			let flyPaper = new joint.dia.Paper({
				el: $("#flyPaper"),
				width: 110,
				height: 100,
				model: flyGraph,
				interactive: false
			});
			let flyShape = cellView.model.clone();
			let pos = cellView.model.position();
			let offset = {
				x: x - pos.x,
				y: y - pos.y
			};

			flyShape.position(2, 2);
			flyGraph.addCell(flyShape);
			$("#flyPaper").offset({
				left: e.pageX - offset.x,
				top: e.pageY - offset.y
			});
			$("body").on("mousemove.fly", (e) => {
				$("#flyPaper").offset({
					left: e.pageX - offset.x,
					top: e.pageY - offset.y
				});
			});
			$("body").on("mouseup.fly", (e) => {
				let x = e.pageX;
				let y = e.pageY;
				const paper = window.lbPaper;
				let target = paper.$el.offset();

				// 判断是否落在paper上
				if (x > target.left && x < target.left + paper.$el.width() && y > target.top && y < target.top + paper.$el.height()) {
					let s = flyShape.clone();
					s.position(x - target.left - offset.x, y - target.top - offset.y);
					window.lbGraph.addCell(s);
				}
				$("body").off("mousemove.fly").off("mouseup.fly");
				flyShape.remove();
				$("#flyPaper").remove();
			});
		});

	}

	render() {
		return (
			<div className="left-panel">
				<div ref={this.ref}></div>
			</div>
		);
	}
}
