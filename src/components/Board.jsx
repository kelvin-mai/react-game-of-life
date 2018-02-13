import React, { Component } from 'react';

class Board extends Component {
	constructor(props) {
		super(props);
		this.state = {
			rows: 30,
			columns: 50,
			grid: [],
			intervalId: 0
		};
		this.makeGrid = this.makeGrid.bind(this);
		this.step = this.step.bind(this);
		this.count = this.count.bind(this);
		this.seed = this.seed.bind(this);
		this.play = this.play.bind(this);
		this.pause = this.pause.bind(this);
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

		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				let state = grid[i][j];
				let neighbors = this.count(grid, i, j);

				if (state === 0 && neighbors === 3) {
					next[i][j] = 1;
				} else if (state === 1 && (neighbors < 2 || neighbors > 3)) {
					next[i][j] = 0;
				} else {
					next[i][j] = state;
				}
			}
		}
		this.setState({ grid: next });
	}

	count(grid, x, y) {
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
		const { columns, rows, grid } = this.state;
		for (let i = 0; i < columns; i++) {
			for (let j = 0; j < rows; j++) {
				grid[i][j] = Math.round(Math.random());
			}
		}
		this.setState({ grid });
	}

	play() {
		clearInterval(this.state.intervalId);
		const intervalId = setInterval(this.step, 100);
		this.setState({ intervalId });
	}

	pause() {
		clearInterval(this.state.intervalId);
	}

	render() {
		const { grid } = this.state;
		return (
			<div>
				<button onClick={this.step}>Step</button>
				<button onClick={this.seed}>Randomize</button>
				<button onClick={this.play}>Play</button>
				<button onClick={this.pause}>Pause</button>
				<p>{JSON.stringify(grid)}</p>
			</div>
		);
	}
}

export default Board;
