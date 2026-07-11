import { useState } from 'react';
import '../styles/jing_zi_qi_game.css';

type SquareProp = {
  value: string;
  onSquareClick: () => void;
};

type SquareArr = string[]

// 方格组件
function Square({ value, onSquareClick }: SquareProp) {
  return <button className="square" onClick={onSquareClick}>{value}</button>;
}

function calculateWinner(squareArr: SquareArr) {
  const lineArr = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
  ];
  for (let i = 0; i < lineArr.length; i++) {
    const [a, b, c] = lineArr[i];
    if (squareArr[a] && squareArr[a] === squareArr[b] && squareArr[a] === squareArr[c]) {
      return squareArr[a];
    }
  }
  return null;
}

type BoardProp = {
  xIsNext: boolean;
  squareArr: SquareArr;
  onPlay: (nextSquareArr: SquareArr) => void;
}

// 棋盘组件
function Board({ xIsNext, squareArr, onPlay }: BoardProp) {
  function handleClick(i: number) {
    if (squareArr[i] || calculateWinner(squareArr)) {
      return;
    }
    const nextSquareArr = squareArr.slice();
    if (xIsNext) {
      nextSquareArr[i] = "X";
    } else {
      nextSquareArr[i] = "O";
    }
    onPlay(nextSquareArr);
  }

  const winner = calculateWinner(squareArr);
  let status;
  if (winner) {
    status = `Winner: ${winner}`
  }
  else {
    status = `Next player: ${xIsNext ? "X" : "O"}`
  }

  return (
    <>
      <div className="status">{status}</div>
      <div className="board-row">
        <Square value={squareArr[0]} onSquareClick={() => handleClick(0)} />
        <Square value={squareArr[1]} onSquareClick={() => handleClick(1)} />
        <Square value={squareArr[2]} onSquareClick={() => handleClick(2)} />
      </div>
      <div className="board-row">
        <Square value={squareArr[3]} onSquareClick={() => handleClick(3)} />
        <Square value={squareArr[4]} onSquareClick={() => handleClick(4)} />
        <Square value={squareArr[5]} onSquareClick={() => handleClick(5)} />
      </div>
      <div className="board-row">
        <Square value={squareArr[6]} onSquareClick={() => handleClick(6)} />
        <Square value={squareArr[7]} onSquareClick={() => handleClick(7)} />
        <Square value={squareArr[8]} onSquareClick={() => handleClick(8)} />
      </div>
    </>
  )
}

function Game() {
  const [history, setHistory] = useState([Array(9).fill(null)]);
  const [curMove, setCurMove] = useState(0);
  const xIsNext = curMove % 2 === 0
  const curSquareArr = history[curMove]

  function handlePlay(nextSquareArr: SquareArr) {
    const nextHistory = [...history.slice(0, curMove + 1), nextSquareArr]
    setHistory(nextHistory)
    setCurMove(nextHistory.length - 1)
  }

  function jumpTo(nextMove: number) {
    setCurMove(nextMove)
  }

  // move是索引, moveRecord是移动记录组件
  const moveRecord = history.map((_squareArr: SquareArr, move) => {
    let description;

    if (move > 0) {
      description = 'Go to move #' + move;
    } else {
      description = 'Go to game start';
    }

    return (
      <li key={move}>
        <button onClick={() => jumpTo(move)}>{description}</button>
      </li>
    );
  })

  return (
    <div className="game">
      <div className="game-board">
        <Board xIsNext={xIsNext} squareArr={curSquareArr} onPlay={handlePlay} />
      </div>
      <div className="game-info">
        <ol>{moveRecord}</ol>
      </div>
    </div>
  )
}

export default Game