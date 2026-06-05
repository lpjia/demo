// 最小栈
// 用 [], 右边看作栈顶即可
class MinStack {
  #stack = []
  #fuzhuStack = []

  push(val) {
    this.#stack.push(val)
    // 辅助栈：如果当前值比辅助栈栈顶小（或辅助栈为空），则推入当前值
    if (this.#fuzhuStack.length === 0 || val <= this.#fuzhuStack[this.#fuzhuStack.length - 1]) {
      this.#fuzhuStack.push(val)
    }
  }

  pop() {
    const val = this.#stack.pop()
    if (val === this.#fuzhuStack[this.#fuzhuStack.length - 1]) {
      this.#fuzhuStack.pop()
    }
    return val
  }

  get top() {
    return this.#stack[this.#stack.length - 1]
  }

  // 获取栈中最小值，时间复杂度 O(1)
  getMin() {
    return this.#fuzhuStack[this.#fuzhuStack.length - 1]
  }
}

// ===== 测试 =====
const minStack = new MinStack()
minStack.push(3)
minStack.push(5)
console.log('getMin:', minStack.getMin()) // 3
minStack.push(2)
minStack.push(1)
console.log('getMin:', minStack.getMin()) // 1
minStack.pop()
console.log('getMin:', minStack.getMin()) // 2
console.log('top:', minStack.top)         // 2
minStack.pop()
console.log('getMin:', minStack.getMin()) // 3
