const xm = {
  name: '小明',
  home: 700, // 距离学校的距离
}

const schoolClassmates = [
  {
    name: '小红',
    home: 400,
  },
  {
    name: '小刚',
    home: 801,
  },
  {
    name: '小李',
    home: 300,
  },
  {
    name: '小王',
    home: 900,
  },
  {
    name: '小赵',
    home: 600,
  },
  {
    name: '小钱',
    home: 200,
  },
  {
    name: '小孙',
    home: 701,
  }
]


/**
 * 根据info的距离, 为arr元素排序出离info近的顺序, 近的元素靠前
 * @param {array} arr 源数据
 * @param {object} info 排序参考对象
 */
function sort(arr, info) {
  function _dis(p1, p2) {
    return Math.abs(p1.home - p2.home)
  }
  // toSorted 方法需要>=node20 或>=chrome110
  return arr.toSorted((a, b) => _dis(a, info) - _dis(b, info))
    .map(it => ({ ...it, dis: _dis(it, info) }))
}

console.log(sort(schoolClassmates, xm))