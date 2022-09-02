import { Model } from "sequelize-typescript"

interface Opti {
  currPage: number,
  limit: number,
  // data?: any, // null 还是 []
  total: number
}

// 分页统一处理
export default function pagination<T extends Model[]>(data: T, option: Opti) {
  const { currPage, limit, total } = option
  return {
    currPage,
    limit, // 前两个是前端必传
    data,
    total,
    // pageTotal: Math.ceil(total / limit)
  }
}