import React, { Component } from "react";
import "./App.css";
import Status from "./Status";

class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      board: Array(9).fill(null),
      player: null,
      winner: null,
      isDraw: null,
      stepsAmount: 0
    };
  }

  checkDraw() {
    if (!this.state.winner && this.state.stepsAmount === 9) {
      this.setState({
        isDraw: true
      });
    }
    return;
  }

  checkWinner(newBoard) {
    let winComb = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6]
    ];

    for (let index = 0; index < winComb.length; index++) {
      const [a, b, c] = winComb[index];
      if (
        newBoard[a] &&
        newBoard[a] === newBoard[b] &&
        newBoard[a] === newBoard[c]
      ) {
        return this.state.player;
      }
    }
  }

  handleClick(index) {
    if (this.state.player && !this.state.winner) {
      const newBoard = this.state.board.slice();
     
      let newstepsAmount = this.state.stepsAmount;
      if (this.state.board[index] === null) {
        newBoard[index] = this.state.player;
         const winner = this.checkWinner(newBoard);
        this.setState(
          {
            board: newBoard,
            player: this.state.player === "X" ? "O" : "X",
            stepsAmount: newstepsAmount + 1,
            winner: winner,
          },
          () => {
            this.checkDraw();
          }
        );
      }
    }
  }

  setPlayer(player) {
    this.setState({ player });
  }

  renderCells() {
    return this.state.board.map((cell, index) => (
      <div className="box" key={index} onClick={() => this.handleClick(index)}>
        {cell}
      </div>
    ));
  }

  reset() {
    this.setState({
      board: Array(9).fill(null),
      player: null,
      winner: null,
      stepsAmount: 0,
      isDraw: null
    });
  }

  render() {
    return (
      <div className="container">
        <h1>Tic Tac Toe App</h1>
        <Status
          player={this.state.player}
          setPlayer={e => this.setPlayer(e)}
          winner={this.state.winner}
          isDraw={this.state.isDraw}
        />
        <div className="board">{this.renderCells()}</div>
        <button
          disabled={!this.state.winner && !this.state.isDraw}
          onClick={() => this.reset()}
        >
          Reset
        </button>
      </div>
    );
  }
}

export default App;
