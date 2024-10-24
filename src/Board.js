import "./App.css";
import { Component } from "react";
import createBoard from "./utils";
import Cell from "./components/Cell";

class Board extends Component {
  constructor(props) {
    super(props);
    this.state = {
      cells: createBoard(25, 7),
      gameStatus: "In progress",
    };
  }

  handleCellClick = (clickedCellIndex) => {
    this.setState((prevState) => {
      const updatedCells = prevState.cells.map((cell, i) =>
        i === clickedCellIndex ? { ...cell, visible: true } : cell
      );
      return {
        cells: updatedCells,
        gameStatus: this.checkGameStatus(updatedCells),
      };
    });
  };

  checkGameStatus = (cells) => {
    const isGameOver = cells.some((cell) => cell.visible && cell.hasMine);
    const nonMineCells = cells.filter((cell) => !cell.hasMine);
    const isGameWon = nonMineCells.every((cell) => cell.visible);

    if (isGameOver) return "Game over";
    if (isGameWon) return "You won";
    return "In progress";
  };

  renderGameStatus = () => {
    const { gameStatus } = this.state;
    return gameStatus !== "In progress" ? gameStatus : null;
  };

  render() {
    const { cells, gameStatus } = this.state;
    return (
      <>
        <h1>Minröjning</h1>
        <div className="cell-container">
          <h2>{this.renderGameStatus()}</h2>
          <div className="board">
            {cells.map((cell) => (
              <Cell
                key={cell.index}
                cell={cell}
                onCellClick={this.handleCellClick}
                gameStatus={gameStatus}
              />
            ))}
          </div>
        </div>
      </>
    );
  }
}

export default Board;
