// 2024-06-20 19:30 星期四

/* js es6+具有的类

实例成员、私有成员
静态成员

私有方法通常与类的实例相关联，而静态方法并不与任何实例相关联

静态方法里不能直接访问私有成员, 也不能直接访问实例成员
静态方法里this指向构造函数, 也就是类本身

实例方法里this指向类的实例

占位 */

class MyClass {
  #privateMethod() {
    // 私有方法逻辑  
  }

  static myStaticMethod() {
    // 这里不能直接访问 #privateMethod  
    // 但可以通过其他方式间接访问，比如传递一个回调函数  
  }

  myInstanceMethod() {
    this.#privateMethod(); // 实例方法可以访问私有方法  
  }
}