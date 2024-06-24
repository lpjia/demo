/* 数据结构之一 */

class Node {
  constructor(data, next = null) {
    this.data = data;
    this.next = next;
  }
}

class LinkedList {
  constructor() {
    this.head = null;
  }

  // 在链表末尾添加节点  
  append(data) {
    const newNode = new Node(data);
    if (!this.head) {
      this.head = newNode;
    } else {
      let currentNode = this.head;
      while (currentNode.next) {
        currentNode = currentNode.next;
      }
      currentNode.next = newNode;
    }
  }

  printList() {
    let currentNode = this.head;
    while (currentNode) {
      console.log(currentNode.data);
      currentNode = currentNode.next;
    }
  }

  prepend(data) {
    const newNode = new Node(data, this.head);
    this.head = newNode;
  }

  deleteNode(data) {
    if (this.head === null) {
      return;
    }

    if (this.head.data === data) {
      this.head = this.head.next;
      return;
    }

    let currentNode = this.head;
    while (currentNode.next) {
      if (currentNode.next.data === data) {
        currentNode.next = currentNode.next.next;
        return;
      }
      currentNode = currentNode.next;
    }
  }

  // 在链表的指定位置插入节点  
  insertAt(position, data) {
    if (position < 0) {
      throw new Error('Position must be a non-negative integer');
    }

    const newNode = new Node(data);

    if (position === 0) {
      // 插入到头部  
      newNode.next = this.head;
      this.head = newNode;
    } else {
      // 查找要插入位置的前一个节点  
      let currentNode = this.head;
      let previousNode = null;
      let currentIndex = 0;

      while (currentNode && currentIndex < position) {
        previousNode = currentNode;
        currentNode = currentNode.next;
        currentIndex++;
      }

      // 如果到达链表末尾仍未找到指定位置，则不能插入  
      if (!currentNode && currentIndex !== position) {
        throw new Error('Position is out of bounds');
      }

      // 插入到当前节点之前  
      previousNode.next = newNode;
      newNode.next = currentNode;
    }
  }

  getLength() {
    let currentNode = this.head;
    let length = 0;
    while (currentNode) {
      length++;
      currentNode = currentNode.next;
    }
    return length;
  }
}

// 使用示例  
const list = new LinkedList();
list.append(1);
list.append(2);
list.append(3);
list.insertAt(1, 1.5);
list.prepend(0);
list.printList();
console.log(
  list.getLength()
)

list.deleteNode(2);
list.printList();