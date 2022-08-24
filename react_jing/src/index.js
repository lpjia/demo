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
      // return squares[a];
      return {
        val: squares[a],
        winLine: lines[i]
      }
    }
  }
  // return null;
  return {
    val: null,
    winLine: []
  }
}


/* 判断列号 行号 */
function calcNum(i) {
  const arr = [
    [1, 1],
    [2, 1],
    [3, 1],
    [1, 2],
    [2, 2],
    [3, 2],
    [1, 3],
    [2, 3],
    [3, 3],
  ]

  return arr[i]
}


/* 方格 */
function Square(props) {
  return (
    <button
      className={props.isLine ? 'line square' : 'square'}
      onClick={props.onClick}
    >
      {props.value}
    </button>
  )
}


/* 棋盘 */
class Board extends React.Component {
  renderSquare(i) {
    return (
      <Square
        isLine={this.props.winLine.includes(i)}
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


/* 游戏 */
class Game extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      history: [
        {
          squares: Array(9).fill(null),
          posi: [null, null],
        }
      ],
      stepNumber: 0,
      xIsNext: true,
      isReverse: false,
    }
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1)
      , current = history[history.length - 1]
      , squares = current.squares.slice()
      , posi = calcNum(i)

    if (calculateWinner(squares).val || squares[i]) return;

    squares[i] = this.state.xIsNext ? 'X' : 'O'
    this.setState({
      history: history.concat(
        [
          {
            squares: squares,
            posi
          }
        ]
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

  changeHistorySort() {
    this.setState({
      isReverse: !this.state.isReverse
    })
  }

  render() {
    const history = this.state.history
      , current = history[this.state.stepNumber]
      , winner = calculateWinner(current.squares).val
      , moves = history.map((step, move) => {
        const desc = move
          ? `Go to move # ${move} (${step.posi[0]},${step.posi[1]})`
          : 'Go to game start'

        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTo(move)}
              className={this.state.stepNumber === move ? 'active' : ''}
            >
              {desc}
            </button>
          </li>
        )
      })

    const msg = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let status = winner ? 'Winner: ' + winner : msg
      , winLine = calculateWinner(current.squares).winLine
    if (this.state.stepNumber === 9 && history.length === 10 && !winLine.length) status = '平局'

    return (
      <div className="game">
        <div className="game-board">
          <Board
            squares={current.squares}
            winLine={winLine}
            onClick={i => this.handleClick(i)}
          />
          <div className='gap'>
            <button onClick={() => this.changeHistorySort()}>改变历史记录顺序</button>
          </div>
        </div>
        <div className="game-info">
          <div>{status}</div>
          <ol className={this.state.isReverse ? 'jiang' : ''}>{moves}</ol>
        </div>
      </div>
    );
  }
}


const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(<Game />);