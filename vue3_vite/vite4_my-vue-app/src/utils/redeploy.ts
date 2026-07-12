export default class Updater {
  oldScript: string[] // 存储第一次值也就是script的hash信息
  newScript: string[] // 获取新的值, 也就是新的script的hash信息
  dispatch: Record<string, Function[]> // 小型发布订阅, 通知用户更新了

  constructor(options: { timer?: number }) {
    this.oldScript = [];
    this.newScript = []
    this.dispatch = {}
    this.init() // 初始化
    this.timing(options?.timer) // 轮询
  }

  async init() {
    const html: string = await this.getHtml()
    this.oldScript = this.parserScript(html)
  }

  async getHtml() {
    const html = await fetch('/').then(res => res.text()); // 读取index.html
    return html
  }

  parserScript(html: string) {
    const reg = new RegExp(/<script(?:\s+[^>]*)?>(.*?)<\/script\s*>/ig) // script正则
    return html.match(reg) as string[] // 匹配script标签
  }

  // 发布订阅通知
  on(key: 'no-update' | 'update', fn: Function) {
    (this.dispatch[key] || (this.dispatch[key] = [])).push(fn)
    return this;
  }

  compare(oldArr: string[], newArr: string[]) {
    const base = oldArr.length
    const arr = Array.from(new Set(oldArr.concat(newArr)))
    // 如果新旧length一样, 则无更新, 否则通知更新
    this.dispatch[arr.length === base ? 'no-update' : 'update'].forEach(fn => fn())
  }

  timing(time = 10000) {
    // 轮询
    setInterval(async () => {
      const newHtml = await this.getHtml()
      this.newScript = this.parserScript(newHtml)
      this.compare(this.oldScript, this.newScript)
    }, time)
  }
}