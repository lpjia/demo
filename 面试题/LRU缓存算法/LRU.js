class LRUCache {
  // #map = null // 直接置为null, 不能提示Map的相关成员
  #map
  #length = 0

  constructor(length) {
    /* Map 对象是键值对的集合
    迭代按插入顺序进行 */
    this.#map = new Map()
    this.#length = length
  }

  // 为了打印查看map
  look() {
    return this.#map
  }

  get(key) {
    if (!this.#map.has(key)) {
      return;
    }

    /* 读数据
    相当于某一条数据变为最新的又重新加入cache */
    const value = this.#map.get(key)
    this.#map.delete(key)
    this.#map.set(key, value)
    return value
  }

  set(key, value) {
    if (this.#map.has(key)) {
      this.#map.delete(key)
    }

    this.#map.set(key, value)
    if (this.#map.size > this.#length) {
      /* keys()返回一个迭代器
      可通过next().value来取到值 */
      const firstKey = this.#map.keys().next().value
      this.#map.delete(firstKey)
    }
  }
}


// 测试
const myMap = new LRUCache(3)
myMap.set("0", "foo");
myMap.set(1, "bar");
myMap.set(true, "leo");

console.log(myMap.look())

myMap.set('0', "baz");
console.log(myMap.look())