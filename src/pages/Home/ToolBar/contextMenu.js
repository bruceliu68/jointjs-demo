import React, { useState } from "react";

const elementList = [
	{ name: "复制", disabled: false }
];
const blankList = [
	{ name: "粘贴", disabled: false }
];

export default props => {
	const { visible, position, type } = props;

	let list = [];
	if (type === "element") list = Object.assign([], elementList);
	if (type === "blank") list = Object.assign([], blankList);

	return (
		<div
			className="m-contextmenu"
			style={{ left: position.x + 10, top: position.y + 10 }}
		>
			{
				visible &&
				<ul>
					{
						list.map((item, index) => {
							return (
								<li key={index} onClick={() => props.onClickItem(item)}>
									{item.name}
								</li>
							);
						})
					}
				</ul>
			}
		</div>
	);
};
