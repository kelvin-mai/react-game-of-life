import React, { Component } from 'react';
import Grid from './Grid.jsx';

// const dataset = [
// 	[0, 1, 0, 1, 0],
// 	[1, 1, 1, 0, 0],
// 	[1, 0, 1, 1, 1],
// 	[0, 0, 0, 1, 0],
// 	[1, 0, 1, 1, 0]
// ];

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 5,
			columns: 5,
			grid: []
		};
		this.makeGrid = this.makeGrid.bind(this);
		this.step = this.step.bind(this);
		this.countNeighbors = this.countNeighbors.bind(this);
		this.seed = this.seed.bind(this);
	}

	componentDidMount() {
		const { columns, rows } = this.state;
		let grid = this.makeGrid();
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = 0;
			}
		}
		this.setState({ grid });
	}

	makeGrid() {
		const { columns, rows } = this.state;
		let grid = new Array(columns);
		for (let i = 0; i < grid.length; i++) {
			grid[i] = new Array(rows);
		}
		return grid;
	}

	step() {
		let next = this.makeGrid();
		const { grid, columns, rows } = this.state;

		// compute next grid
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				let state = grid[i][j];
				// count live neighbors
				let neighbors = this.countNeighbors(grid, i, j);

				if (state == 0 && neighbors == 3) {
					next[i][j] = 1;
				} else if (state == 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				} else {
					next[i][j] = state;
				}
			}
		}
		this.setState({ grid: next });
	}

	countNeighbors(grid, x, y) {
		const { columns, rows } = this.state;
		let sum = 0;
		for (let i = -1; i < 2; i++) {
			for (let j = -1; j < 2; j++) {
				let col = (x + i + columns) % columns;
				let row = (y + j + rows) % rows;

				sum += grid[col][row];
			}
		}

		sum -= grid[x][y];
		return sum;
	}

	seed() {
		console.log('random');
		const { columns, rows, grid } = this.state;
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = Math.round(Math.random());
			}
		}
		this.setState({ grid });
	}

	render() {
		const { columns, rows, grid } = this.state;
		return (
			<div>
				<p>{JSON.stringify(grid)}</p>
				{/* <Grid columns={columns} rows={rows} grid={grid} /> */}
				<button onClick={this.step}>Step</button>
				<button onClick={this.seed}>Seed</button>
			</div>
		);
	}
}

export default Board;
