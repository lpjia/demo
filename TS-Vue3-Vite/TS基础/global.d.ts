// 接口重名会合并
// 在全局上, 给Window接口扩展这个属性
interface Window {
  person: (n: string) => void
  myName: string
}