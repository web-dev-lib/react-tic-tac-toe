import React, { useState } from "react";

import Board from "components/Board";
import { calculateWinner } from "utils";

const Game = props => {
  const [histor, setHistory] = useState([
    {
      squares: Array(9).fill(null),
    },
  ]);
  const [xIsNext, setXIsNext] = useState(true);
  const [stepNumber, setStepNumber] = useState(0);

  const handleClick = i => {
    const history = histor.slice(0, stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();

    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = xIsNext ? "🧚‍♀️" : "👻";
    setHistory(
      history.concat([
        {
          squares,
        },
      ])
    );
    setStepNumber(history.length);
    setXIsNext(!xIsNext);
  };

  const jumpTo = step => {
    setStepNumber(step);
    setXIsNext(step % 2 === 0);
  };

  const history = histor;
  const current = history[stepNumber];
  const winner = calculateWinner(current.squares);

  const moves = history.map((step, move) => {
    const desc = move ? "Go to step #" + move : "Go to begin";
    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{desc}</button>
      </li>
    );
  });

  let status;

  if (winner === "It's a draw!") {
    status = winner;
  } else {
    if (winner) {
      status = "Win " + winner;
    } else {
      status = "Next step: " + (xIsNext ? "🧚‍♀️" : "👻");
    }
  }

  return (
    <div className="game">
      <div className="game-board">
        <Board squares={current.squares} onClick={i => handleClick(i)} />
      </div>
      <div className="game-info">
        <div>{status}</div>
        <ol>{moves}</ol>
      </div>
    </div>
  );
};

export default Game;
