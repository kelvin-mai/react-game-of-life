import React, { Component } from 'react';

export default class Grid extends Component {
	render() {
		const { grid, columns, rows } = this.props;
		let display = grid.map((row, j) =>
			row.map((col, i) => (
				<div className={`Cell ${grid[i][j] ? 'isActive' : ''}`} />
			))
		);

		// for (let i = 0; i < columns; i++) {
		// 	for (let j = 0; j < rows; j++) {
		// 		display[i][j] = (
		// 			<div className={`Cell ${display[i][j] === 1 ? 'isActive' : ''}`} />
		// 		);
		// 	}
		// }

		return (
			<div
				className="Grid"
				style={{
					width: this.props.columns * 14
				}}>
				{display}
			</div>
		);
	}
}
