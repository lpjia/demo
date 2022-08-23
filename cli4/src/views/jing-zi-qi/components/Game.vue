<script>
import Board from './Board.vue'
import { calculateWinner, calcNum } from './tool.js'

export default {
  name: 'Game', // 游戏
  components: {
    Board
  },
  data() {
    return {
      state: {
        history: [
          {
            squares: Array(9).fill(null),
            posi: [null, null],
          }
        ],
        stepNumber: 0,
        xIsNext: true,
      }
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
  },
  methods: {
    jumpTo(step) {
      this.setState({
        stepNumber: step,
        xIsNext: (step % 2) === 0,
      })
    },
    handleClick(i) {
      const history = this.state.history.slice(0, this.state.stepNumber + 1)
        , current = history[history.length - 1]
        , squares = current.squares.slice()
        , posi = calcNum(i)

      if (calculateWinner(squares) || squares[i]) return;

      squares[i] = this.state.xIsNext ? 'X' : 'O'

      // 
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
  },
  render() {
    const history = this.state.history
      , current = history[this.state.stepNumber]
      , winner = calculateWinner(current.squares)
      , moves = history.map((step, move) => {
        const desc = move
          ? `Go to move # ${move} (${step.posi[0]},${step.posi[1]})`
          : 'Go to game start'

        return (
          <li key={move}>
            <button
              onClick={() => this.jumpTo(move)}
            // class={{this.stepNumber === (history.length) ? 'active' : ''}}
            >{desc}</button>
          </li>
        )
      })

    const msg = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    let status = winner ? 'Winner: ' + winner : msg

    console.log(current.squares)

    return (
      <div class="game">
        <div class="game-board">
          <Board
            squares={current.squares}
            onClick={i => this.handleClick(i)}
          />
        </div>
        <div class="game-info">
          <div>{status}</div>
          <ol>{moves}</ol>
        </div>
      </div>
    )
  }
};
</script>

<style scoped lang="scss">
ol,
ul {
  padding-left: 30px;
}
.game {
  display: flex;
  flex-direction: row;
}

.game-info {
  margin-left: 20px;
}
.status {
  margin-bottom: 10px;
}
</style>