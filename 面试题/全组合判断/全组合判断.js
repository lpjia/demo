const isFullCombination = (dataList) => {
  // 先判断边界情况
  if (dataList.length === 0) return false;

  const fieldMap = new Map();
  const keys = Object.keys(dataList[0]);
  const combinationSet = new Set();
  const valueMap = new Map();
  let n = 1
  // 遍历数组和对象所有属性, 拿到每个值
  for (const item of dataList) {
    let combination = ''
    for (const key of keys) {
      const value = item[key];
      // 取Map中每个字段的值(这个值其实是个Set)
      let valueSet = fieldMap.get(key);
      if (!valueSet) {
        valueSet = new Set();
        fieldMap.set(key, valueSet)
      }
      valueSet.add(value);
      let num = valueMap.get(value)
      if (!num) {
        num = n++
        valueMap.set(value, num)
      }
      combination += `-${valueMap.get(value)}`
    }
    console.log(combination)
    combinationSet.add(combination)
  }
  console.log(valueMap)
  console.log(fieldMap)
  console.log([...fieldMap])
  // 所有情况
  const n1 = [...fieldMap].reduce((accu, [k, v]) => accu *= v.size, 1)
  const n2 = dataList.length
  return n1 === n2 && combinationSet.size === n1
}

const inputDataList = [
  { 字段1: '甲', 字段2: 'a', 字段3: '1' },
  { 字段1: '甲', 字段2: 'a', 字段3: '2' },
  { 字段1: '甲', 字段2: 'a', 字段3: '3' },
  { 字段1: '甲', 字段2: 'b', 字段3: '1' },
  { 字段1: '甲', 字段2: 'b', 字段3: '2' },
  { 字段1: '甲', 字段2: 'b', 字段3: '3' },
  { 字段1: '乙', 字段2: 'a', 字段3: '1' },
  { 字段1: '乙', 字段2: 'a', 字段3: '2' },
  { 字段1: '乙', 字段2: 'a', 字段3: '3' },
  { 字段1: '乙', 字段2: 'b', 字段3: '1' },
  { 字段1: '乙', 字段2: 'b', 字段3: '2' },
  { 字段1: '乙', 字段2: 'b', 字段3: '3' },
]
console.log(isFullCombination(inputDataList))