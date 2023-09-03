/* 单例模式
后端固定做法 */
class MyVideo {
  private static _ins: MyVideo
  private constructor() { }

  public static createInstance() {
    if (!this._ins) {
      this._ins = new MyVideo()
    }
    return this._ins
  }
}

// new MyVideo() // 报错

const ins1 = MyVideo.createInstance()
const ins2 = MyVideo.createInstance()
console.log(
  ins1 === ins2
)



class MyTest { }
// 自动创建一个类的接口, 作为实例的类型
const ins3 = new MyTest()