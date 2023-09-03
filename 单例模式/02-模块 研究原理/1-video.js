/* 单例模式
使用模块机制, 但是有缺陷, 这里只研究原理 */
class MyVideo { }

export default new MyVideo()
// 模块只会运行一次, 有缓存的, 后边就复用这个实例