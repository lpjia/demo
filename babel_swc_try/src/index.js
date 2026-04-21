class DatabaseConnection {
  constructor(path) {
    console.log('实例化')
    console.log('数据库连接')
  }

  doSomething() {
    const students = [
      { name: "Tom", grade: "A", subject: "Math" },
      { name: "Jerry", grade: "B", subject: "Math" },
      { name: "Spike", grade: "A", subject: "Science" },
      { name: "Heisenberg", grade: "A", subject: "Math" },
    ];
    const result = Object.groupBy(students, s => `${s.grade}-${s.subject}`);
    console.log('result:', result)
  }

  disconnect() {
    console.log('数据库断开连接')
  }

  // 自动清理
  [Symbol.dispose]() {
    console.log('执行清理逻辑 资源自动释放')
    this.disconnect()
  }
}

function run() {
  using resource = new DatabaseConnection('lu_jing') // using 变量, 块作用域结束 资源自动释放
  resource.doSomething()
  console.log('执行数据库的一些操作');
  console.log('作用域结束')
}
run()