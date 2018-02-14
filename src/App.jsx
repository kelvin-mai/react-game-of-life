import React, { Component } from 'react';

import logo from './logo.svg';
import './App.css';
import Board from './components/Board.jsx';

class App extends Component {
	render() {
		return (
			<div>
				<div className="App">
					<header className="App-header">
						<img src={logo} className="App-logo" alt="logo" />
						<h1 className="App-title">
							Welcome to the <em>Game Of Life</em>
						</h1>
					</header>
				</div>
				<Board />
			</div>
		);
	}
}

export default App;
