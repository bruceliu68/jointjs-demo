/**
 * JointJS操作类
*/

class Operate {
	constructor(graph, paper, current) {
		this.graph = graph;
		this.paper = paper;
		this.current = current;
		const initData = JSON.stringify(this.graph.toJSON());
		this.initGraph = initData; // 初始化时画布数据，供还原使用
		this.preGraph = initData; // 保存当前画布，供监听事件判断画布是否变化使用
		this.history = [initData]; // 存储历史数据，供撤销重做使用
		this.historyIndex = 0;
		this.zoomLevel = 1; // 放大缩小
		this.smallScale = 0.1; // 小窗口比例
		this.initPaperWidth = this.paper.options.width;
		this.initPaperHeight = this.paper.options.height;
		this.paperWidth = this.paper.options.width;
		this.paperHeight = this.paper.options.height;
		this.smallPaper = null; // 导航窗口
		this.onGraphChange();
		this.onPaperChange();
	}

	// 监听画布节点，线变化
	onGraphChange() {
		document.onmouseup = () => {
			const currentGraph = JSON.stringify(this.graph.toJSON());
			if (this.preGraph !== currentGraph) {
				this.preGraph = currentGraph;
				this.history.push(currentGraph);
				this.historyIndex++;
			}
		};
	}

	// 监听节点移动到边界加大边界范围 - 若与导航小窗口同时使用，此功能有问题，需要优化
	onPaperChange() {
		$(".joint-main").append('<div class="horizontal-line"></div>');
		$(".joint-main").append('<div class="vertical-line"></div>');
		this.paper.on("element:pointermove", (modelView, evt, x, y) => {
			this.addSubLine(modelView);
			if (x < 20) {
				let width = this.paper.options.width;
				let height = this.paper.options.height;
				let allElements = this.graph.getElements();
				allElements.forEach(item => {
					item.position(item.position().x + width * 0.1, item.position().y);
				});
				this.paper.setDimensions(width * 1.1, height * 1.1);
				let wrapPaperDom = $(".wrap-paper");
				wrapPaperDom.scrollLeft(wrapPaperDom.scrollLeft() + width * 0.1);
				if (this.smallPaper) {
					$(".current-view").css({
						"width": $(".current-view").width() * 0.9,
						"height": $(".current-view").height() * 0.9
					});
				}
			} else if (y > this.paper.options.height - 20) {
				let width = this.paper.options.width;
				let height = this.paper.options.height;
				this.paper.setDimensions(width * 1.1, height * 1.1);
				if (this.smallPaper) {
					$(".current-view").css({
						"width": $(".current-view").width() * 0.9,
						"height": $(".current-view").height() * 0.9
					});
				}
			} else if (x > this.paper.options.width - 20) {
				let width = this.paper.options.width;
				let height = this.paper.options.height;
				this.paper.setDimensions(width * 1.1, height * 1.1);
				if (this.smallPaper) {
					$(".current-view").css({
						"width": $(".current-view").width() * 0.9,
						"height": $(".current-view").height() * 0.9
					});
				}
			}
		});
		this.paper.on("element:pointerup", (modelView, evt, x, y) => {
			this.removeHorizontalLine();
			this.removeVerticalLine();
		});
	}

	// 检测辅助线
	addSubLine(modelView) {
		const attributes = modelView.model.attributes;
		const position = attributes.position;
		const size = attributes.size;
		// 移动节点的3点数据
		let P = {
			x: position.x,
			x1: position.x + size.width / 2,
			x2: position.x + size.width,
			y: position.y,
			y1: position.y + size.height / 2,
			y2: position.y + size.height
		};
		let mapX = {};
		let mapY = {};
		let allElements = this.graph.getElements();
		allElements.forEach(item => {
			if (attributes.id !== item.id) {
				let sp = item.attributes.position;
				let ss = item.attributes.size;
				let x = sp.x;
				let y = sp.y;
				let x1 = sp.x + ss.width / 2;
				let y1 = sp.y + ss.height / 2;
				let x2 = sp.x + ss.width;
				let y2 = sp.y + ss.height;
				mapX[x] = [x, y];
				mapX[x1] = [x1, y1];
				mapX[x2] = [x2, y2];
				mapY[y] = [x, y];
				mapY[y1] = [x1, y1];
				mapY[y2] = [x2, y2];
			}
		});
		// 垂直线
		if (mapX[P.x] || mapX[P.x1] || mapX[P.x2]) {
			let pos = mapX[P.x] || mapX[P.x1] || mapX[P.x2];
			this.drawVerticalLine(pos);
		} else {
			this.removeVerticalLine();
		}
		// 水平线
		if (mapY[P.y] || mapY[P.y1] || mapY[P.y2]) {
			let pos = mapY[P.y] || mapY[P.y1] || mapY[P.y2];
			this.drawHorizontalLine(pos);
		} else {
			this.removeHorizontalLine();
		}
	}

	// 画水平线
	drawHorizontalLine(pos) {
		$(".horizontal-line").css({
			"left": `${pos[0]}px`,
			"top": `${pos[1]}px`,
			"display": "block"
		});
	}

	// 画垂直线
	drawVerticalLine(pos) {
		$(".vertical-line").css({
			"left": `${pos[0]}px`,
			"top": `${pos[1]}px`,
			"display": "block"
		});
	}

	// 移除水平线
	removeHorizontalLine() {
		$(".horizontal-line").css({ "display": "none" });
	}

	// 移除垂直线
	removeVerticalLine() {
		$(".vertical-line").css({ "display": "none" });
	}

	// 放大
	zoomOut() {
		if (this.zoomLevel > 1.9) return;
		this.paperWidth = this.paperWidth + 400;
		this.paperHeight = this.paperHeight + 300;
		this.zoomLevel = Math.min(2, this.zoomLevel + 0.2);
		this.scale();
	}

	// 缩小
	zoomIn() {
		if (this.zoomLevel < 0.3) return;
		this.paperWidth = this.paperWidth - 400;
		this.paperHeight = this.paperHeight - 300;
		this.zoomLevel = Math.max(0.2, this.zoomLevel - 0.2);
		this.scale();
	}

	// 适合
	fit() {
		this.paperWidth = this.initPaperWidth;
		this.paperHeight = this.initPaperHeight;
		this.zoomLevel = 1;
		this.scale();
	}

	// 还原
	reduction() {
		this.drawGraph(this.initGraph);
	}

	// 撤销
	undo() {
		this.historyIndex--;
		if (this.historyIndex < 0) this.historyIndex = 0;
		this.drawGraph(this.history[this.historyIndex]);
	}

	// 重做
	redo() {
		this.historyIndex++;
		if (this.historyIndex >= this.history.length) this.historyIndex = this.history.length - 1;
		this.drawGraph(this.history[this.historyIndex]);
	}

	// 清空
	clear() {
		this.graph.clear();
	}

	// 保存
	save() {
		const jsonString = JSON.stringify(this.graph.toJSON());
		return jsonString;
	}

	// 重绘
	drawGraph(stringGraph) {
		this.graph.fromJSON(JSON.parse(stringGraph));
		this.preGraph = stringGraph;
	}

	// 缩放
	scale() {
		this.paper.scale(this.zoomLevel);
		this.paper.setDimensions(this.paperWidth, this.paperHeight);

		let abs = Math.abs(1 - this.zoomLevel);
		let scale = 0.1;
		if (this.zoomLevel > 1) {
			scale = 0.1 - abs / 2 * 0.1;
		} else if (this.zoomLevel < 1) {
			scale = 0.1 + abs * 0.1;
		}
		this.smallScale = scale;
		let wrapPaperDom = $(".wrap-paper");
		$(".current-view").css({
			"width": wrapPaperDom.innerWidth() * scale - 2,
			"height": wrapPaperDom.innerHeight() * scale - 2
		});
		wrapPaperDom.off("scroll"); // // 关闭滚动监听
		// 开启滚动监听
		wrapPaperDom.on("scroll", (e) => {
			$(".current-view").css({
				"top": wrapPaperDom.scrollTop() * scale,
				"left": wrapPaperDom.scrollLeft() * scale
			});
		});
	}

	// 设置导航小窗口 - 此功能有问题，需要优化，如果你有好的实现，请提供给我们哦~
	initSmallNav() {
		$(".wrap-paper").append('<div id="paper-multiple-small" class="joint-navigator"></div>');
		// 小窗口视图
		const smallEl = document.getElementById("paper-multiple-small");
		let paperSmall = new joint.dia.Paper({
			el: smallEl,
			model: this.graph,
			width: this.paper.options.width / 10,
			height: this.paper.options.height / 10,
			gridSize: 1,
			interactive: false
		});
		paperSmall.scale(0.1);
		let wrapPaperDom = $(".wrap-paper");
		let sTop = wrapPaperDom.scrollTop() * this.smallScale;
		let sLeft = wrapPaperDom.scrollLeft() * this.smallScale;
		let sWidth = wrapPaperDom.innerWidth() * this.smallScale - 2;
		let sHeight = wrapPaperDom.innerHeight() * this.smallScale - 2;
		$("#paper-multiple-small").append(`
			<div 
				class="current-view" 
				style="top: ${sTop}px; left: ${sLeft}px; width: ${sWidth}px; height: ${sHeight}px"
			>
			</div>
		`);
		// 开启滚动监听
		wrapPaperDom.on("scroll", (e) => {
			$(".current-view").css({
				"top": wrapPaperDom.scrollTop() * this.smallScale,
				"left": wrapPaperDom.scrollLeft() * this.smallScale
			});
		});
		let mouseFlag = false;
		document.querySelector(".current-view").onmousedown = (e) => {
			wrapPaperDom.off("scroll"); // // 关闭滚动监听
			mouseFlag = true;
			let currentOffsetX = e.offsetX;
			let currentOffsetY = e.offsetY;
			let curentViewWidth = $(".current-view").width();
			let curentViewHeight = $(".current-view").height();
			let parentDom = $(".joint-navigator");
			let parentLeft = parentDom.offset().left;
			let parentTop = parentDom.offset().top;
			let parentWidth = parentDom.width();
			let parentHeight = parentDom.height();
			let maxWidth = parentWidth - curentViewWidth;
			let maxHeight = parentHeight - curentViewHeight;
			let navDom = document.querySelector(".joint-navigator");
			navDom.onmousemove = (e) => {
				if (mouseFlag) {
					// 动态设置坐标及边界控制
					let top = e.clientY - currentOffsetY - parentTop;
					let left = e.clientX - currentOffsetX - parentLeft;
					let realTop = top;
					let realLeft = left;
					if (top <= 0) realTop = 0;
					if (top >= maxHeight) realTop = maxHeight - 4;
					if (left <= 0) realLeft = 0;
					if (left >= maxWidth) realLeft = maxWidth - 4;
					$(".current-view").css({
						"top": realTop,
						"left": realLeft
					});
					// 同步画布视窗
					wrapPaperDom.scrollTop(realTop / this.smallScale);
					wrapPaperDom.scrollLeft(realLeft / this.smallScale);
				}
			};
			document.body.onmouseup = (e) => {
				navDom.onmousemove = null;
				document.body.onmouseup = null;
				mouseFlag = false;
				// 开启滚动监听
				wrapPaperDom.on("scroll", (e) => {
					$(".current-view").css({
						"top": wrapPaperDom.scrollTop() * this.smallScale,
						"left": wrapPaperDom.scrollLeft() * this.smallScale
					});
				});
			};
		};

		this.smallPaper = paperSmall;
	}

}

export default Operate;
