/* 数据结构之一 */

class Queue {
  /* items应该是私有的, 外界不能篡改它
  isEmpty方法只能内部用 */

  #items = []
  /* size = 0 // 容易被外面篡改 */

  #isEmpty() {
    return this.#items.length === 0
  }

  /* 读size属性时, 防止外面篡改
  学会这招, 保护内部数据 */
  get size() {
    return this.#items.length
  }

  /* 入列 */
  enqueue(item) {
    this.#items.push(item)
    /* this.size++ */
    console.log('this:', this)
  }

  /* 出列 */
  dequeue() {
    if (this.#isEmpty()) {
      return null
    }
    /* this.size <= 0 ? this.size = 0 : this.size-- */
    return this.#items.shift()
  }

  front() {
    if (this.#isEmpty()) {
      return null
    }
    return this.#items[0]
  }

  end() {
    if (this.#isEmpty()) {
      return null
    }
    return this.#items[this.#items.length - 1]
    // return this.#items.at(-1)
  }
}



let queue = new Queue()
queue.enqueue('a')
queue.enqueue('b')
queue.enqueue('c')
console.log(
  queue.size, queue.dequeue(), queue, queue.front()
)
// queue.dequeue()
queue.dequeue()
queue.items = [11, 22, 33] // 不影响Queue类内部的数据
queue.size = 10 // 不影响Queue类内部的数据
console.log(
  // queue.size, queue.dequeue(), queue, 
  queue.front(), queue.end()
)