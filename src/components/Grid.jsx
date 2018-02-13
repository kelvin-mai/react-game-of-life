import React, { Component } from 'react';
import Cell from './Cell';

class Grid extends Component {
	render() {
		const { columns, rows, grid } = this.props;
		const cells = grid.map((col, i) =>
			col.map((row, j) => <Cell key={`${i}_${j}`} />)
		);
		return (
			<div
				style={{
					width: columns * 17,
					border: '1px solid black',
					margin: 'auto'
				}}>
				{cells}
			</div>
		);
	}
}

export default Grid;
