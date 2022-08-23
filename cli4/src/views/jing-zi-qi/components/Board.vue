<script>
import Square from './Square.vue'

export default {
  name: 'Board', // 棋盘
  components: {
    Square
  },
  props: {
    squares: Array
  },
  // functional: true,
  // render(h, ctx) {
  render() {
    console.log(this.props)
    const renderSquare = i => {
      return (
        <Square
          value={this.squares[i]}
          onClick={() => this.onClick(i)}
        />
      )
    }

    return (
      <div>
        <div class="board-row">
          {renderSquare(0)}
          {renderSquare(1)}
          {renderSquare(2)}
        </div>
        <div class="board-row">
          {renderSquare(3)}
          {renderSquare(4)}
          {renderSquare(5)}
        </div>
        <div class="board-row">
          {renderSquare(6)}
          {renderSquare(7)}
          {renderSquare(8)}
        </div>
      </div>
    )
  }
};
</script>

<style scoped lang="scss">
.board-row:after {
  clear: both;
  content: '';
  display: table;
}
</style>