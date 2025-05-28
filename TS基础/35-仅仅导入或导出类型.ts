/* import type { ObjType } from './35-仅仅导入或导出类型' */

type ObjType<T> = {
  name: T
}

export type { ObjType }