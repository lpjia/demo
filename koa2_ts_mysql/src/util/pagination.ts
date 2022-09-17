import { Model } from "sequelize-typescript"
import { formatTime } from "./time"

interface Opti {
  currPage: number
  limit: number
  total: number
  // data?: any, // null 还是 []
}

// 分页统一处理
export default function pagination<T extends Model[]>(data: T, option: Opti) {
  const { currPage, limit, total } = option
  // let dataList = data.map(item => formatTime(item)) // 多余

  return {
    currPage,
    limit, // 前两个是前端必传
    total,
    data,
  }
}