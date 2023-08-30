// 接口重名会合并
// 在全局上, 给Window接口扩展这个属性
interface Window {
  person: (n: string) => void
  myName: string
}


/* 显示详细的类型定义 */
type ShowMe<T> = {
  [P in keyof T]: T[P] extends object ? Expand<T[P]> : T[P];
};
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;