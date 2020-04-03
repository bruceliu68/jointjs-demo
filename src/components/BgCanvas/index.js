/*
 * @Author: liubo
 * @CreatDate: 2018-09-30 17:13:02
 * @Describe: canvas背景特效
 */

import React, { PureComponent } from "react";

class BgCanvas extends PureComponent {
	constructor(props) {
		super(props);
		this.Line = this.Line.bind(this);
		this.Circle = this.Circle.bind(this);
		this.num = this.num.bind(this);
		this.drawCricle = this.drawCricle.bind(this);
		this.drawLine = this.drawLine.bind(this);
		this.init = this.init.bind(this);
		this.draw = this.draw.bind(this);
		this.state = {
			circleArr: [],
			POINT: 30,
			WIDTH: window.innerWidth,
			HEIGHT: window.innerHeight - 64
		};
	}

	componentDidMount() {
		let { WIDTH, HEIGHT, POINT } = this.state;
		// 定义画布宽高和生成点的个数
		let canvas = document.getElementById("Mycanvas");
		canvas.width = WIDTH;
		canvas.height = HEIGHT;
		let context = canvas.getContext("2d");
		context.strokeStyle = "rgba(0,0,0,0.02)";
		context.strokeWidth = 1;
		context.fillStyle = "rgba(0,0,0,0.05)";
		this.setState({
			canvas,
			context
		});
		this.init();
		setInterval(() => {
			let { circleArr } = this.state;
			if (circleArr.length === 0) return;
			for (let i = 0; i < POINT; i++) {
				let cir = circleArr[i];
				cir.x += cir.moveX;
				cir.y += cir.moveY;
				if (cir.x > WIDTH) cir.x = 0;
				else if (cir.x < 0) cir.x = WIDTH;
				if (cir.y > HEIGHT) cir.y = 0;
				else if (cir.y < 0) cir.y = HEIGHT;

			}
			this.draw();
		}, 16);
	}

	// 线条：开始xy坐标，结束xy坐标，线条透明度
	Line(x, y, _x, _y, o) {
		return {
			beginX: x,
			beginY: y,
			closeX: _x,
			closeY: _y,
			o
		};
	}

	// 点：圆心xy坐标，半径，每帧移动xy的距离
	Circle(x, y, r, moveX, moveY) {
		return {
			x,
			y,
			r,
			moveX,
			moveY
		};
	}

	// 生成max和min之间的随机数
	num(max, _min) {
		let min = arguments[1] || 0;
		return Math.floor(Math.random() * (max - min + 1) + min);
	}

	// 绘制原点
	drawCricle(cxt, x, y, r, moveX, moveY) {
		let circle = this.Circle(x, y, r, moveX, moveY);
		cxt.beginPath();
		cxt.arc(circle.x, circle.y, circle.r, 0, 2 * Math.PI);
		cxt.closePath();
		cxt.fill();
		return circle;
	}

	// 绘制线条
	drawLine(cxt, x, y, _x, _y, o) {
		var line = this.Line(x, y, _x, _y, o);
		cxt.beginPath();
		cxt.strokeStyle = "rgba(0,0,0," + o + ")";
		cxt.moveTo(line.beginX, line.beginY);
		cxt.lineTo(line.closeX, line.closeY);
		cxt.closePath();
		cxt.stroke();
	}

	// 初始化生成原点
	init() {
		this.timer = setInterval(() => {
			let { circleArr, POINT, WIDTH, HEIGHT, context } = this.state;
			if (context) {
				clearInterval(this.timer);
				circleArr = [];
				for (let i = 0; i < POINT; i++) {
					circleArr.push(this.drawCricle(context, this.num(WIDTH), this.num(HEIGHT), this.num(15, 2), this.num(10, -10) / 40, this.num(10, -10) / 40));
				}
				this.setState({
					circleArr
				});
				this.draw();
			}
		}, 100);
	}

	// 每帧绘制
	draw() {
		let { context, canvas, POINT, circleArr } = this.state;
		context.clearRect(0, 0, canvas.width, canvas.height);
		for (let i = 0; i < POINT; i++) {
			this.drawCricle(context, circleArr[i].x, circleArr[i].y, circleArr[i].r);
		}
		for (let i = 0; i < POINT; i++) {
			for (let j = 0; j < POINT; j++) {
				if (i + j < POINT) {
					const A = Math.abs(circleArr[i + j].x - circleArr[i].x);
					const B = Math.abs(circleArr[i + j].y - circleArr[i].y);
					const lineLength = Math.sqrt(A * A + B * B);
					const C = 1 / lineLength * 7 - 0.009;
					const lineOpacity = C > 0.03 ? 0.03 : C;
					if (lineOpacity > 0) {
						this.drawLine(context, circleArr[i].x, circleArr[i].y, circleArr[i + j].x, circleArr[i + j].y, lineOpacity);
					}
				}
			}
		}
	}

	render() {
		const style = {
			position: "absolute",
			left: 0,
			top: 0
		};
		return (
			<canvas id="Mycanvas" style={style}></canvas>
		);
	}
}

export default BgCanvas;
