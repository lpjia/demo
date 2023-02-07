// 组织架构, 扁平化且去重
// 后端接口可能返回类似数据结构
const deps = {
  '人事部': [5, 8, 12],
  '行政部': [5, 14, 79],
  '运输部': [3, 64, 105],
  '采购部': [1, 2, 3],
}
const member = [...new Set(Object.values(deps).flat(Infinity))]
console.log('member: ', member)
console.log('升序后: ', member.sort((a, b) => a - b))