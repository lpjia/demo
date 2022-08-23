import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';


/* 判断赢家 */
function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      return squares[a];
    }
  }
  return null;
}


/* 判断列号 行号 */
function calc(params) {
  const col = []
}


/* 方格 */
function Square(props) {
  return (
    <button
      className="square"
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}



// class Square_3 extends React.Component {
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.props.onClick()}
//       >
//         {this.props.value}
//       </button>
//     )
//   }
// }



// class Square_2 extends React.Component {
//   constructor(props) {
//     super(props)
//     this.state = {
//       value: props.value
//     }
//   }
//   render() {
//     return (
//       <button
//         className="square"
//         onClick={() => this.setState({ value: 'X' })}
//       >
//         {/* {this.props.value} */}
//         {this.state.value}
//       </button>
//     )
//   }
// }




/* 棋盘 */
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        value={this.props.squares[i]}
        onClick={() => this.props.onClick(i)}
      />
    )
  }

  render() {
    return (
      <div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}


class Board_2 extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true,
    }
  }

  handleClick(i) {
    const squares = this.state.squares.slice()

    // 有赢家或方格已走, 直接返回
    if (calculateWinner(squares) || squares[i]) return;

    // squares[i] = 'X'
    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      squares: squares,
      xIsNext: !this.state.xIsNext
    })
    console.log(squares)
  }

  renderSquare(i) {
    // return <Square_2 value={i} />;
    return (
      <Square
        value={this.state.squares[i]}
        onClick={() => this.handleClick(i)}
      />
    )
  }

  render() {
    // const status = 'Next player: X';
    // const status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const msg = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    const winner = calculateWinner(this.state.squares)
    let status = winner ? 'Winner: ' + winner : msg

    return (
      <div>
        <div className="status">{status}</div>
        <div className="board-row">
          {this.renderSquare(0)}
          {this.renderSquare(1)}
          {this.renderSquare(2)}
        </div>
        <div className="board-row">
          {this.renderSquare(3)}
          {this.renderSquare(4)}
          {this.renderSquare(5)}
        </div>
        <div className="board-row">
          {this.renderSquare(6)}
          {this.renderSquare(7)}
          {this.renderSquare(8)}
        </div>
      </div>
    );
  }
}




/* 游戏 */
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null)
        }
      ],
      stepNumber: 0,
      xIsNext: true,
    }
  }

  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
      , current = history[history.length - 1]
      , squares = current.squares.slice()

    if (calculateWinner(squares) || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat(
        [{ squares: squares }]
      ),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    })
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    })
  }

  render() {
    const history = this.state.history
      , current = history[this.state.stepNumber]
      , winner = calculateWinner(current.squares)
      , moves = history.map((step, move) => {
        const desc = move ? 'Go to move #' + move
          : 'Go to game start'

        return (
          <li key={move}>
            <button onClick={() => this.jumpTo(move)}>{desc}</button>
          </li>
        )
      })



    const msg = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let status = winner ? 'Winner: ' + winner : msg

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    );
  }
}


class Game_2 extends React.Component {
  render() {
    return (
      <div className="game">
        <div className="game-board">
          <Board_2 />
        </div>
        <div className="game-info">
          <div>{/* status */}</div>
          <ol>{/* TODO */}</ol>
        </div>
      </div>
    );
  }
}

// ========================================

const root = ReactDOM.createRoot(document.getElementById("root"));
// root.render(<Game_2 />);
root.render(<Game />);
