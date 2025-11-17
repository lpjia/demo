/* 显示详细的类型定义 */
type ShowMe<T> = {
  [P in keyof T]: T[P] extends object ? Expand<T[P]> : T[P];
};
type Expand<T> = T extends infer O ? { [K in keyof O]: O[K] } : never;