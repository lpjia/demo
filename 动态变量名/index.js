/**
 *  eval(), 但不推荐用
 */
let abc = 123
function getVar(_var) {
  // var 是关键词, 不能用作参
  // 'var ret = ', 用 let const 声明变量会报错
  // let expression = 'var ret = ' + _var;
  let expression = 'var ret = ' + _var;
  eval(expression);
  return ret;
}
console.log("getVar('abc'): ", getVar('abc'))

let var_1 = 111
let var_2 = 222
let var_3 = 333
let var_4 = 444
let var_5 = 555
for (let i = 1; i <= 5; i++) {
  console.log(eval('var_' + i))
}
console.log('---- 分割线 ----\n\n\n')




/**
 * obj['变量名']
 */
/**
 * 用 echarts 实例那种形式, 需要用变量来存
 * 数据源应该是多个对象组成的数组, 每个对象作为一个实例源
 * echarts.init(dom)
 */
const varObj = {}
for (let i = 0; i < 5; i++) {
  let y = i + 1
  // 一些语句执行后
  /*
  let leng = arr.length
  for (let i = 0; i < leng; i++) {
    let chart = new LineChart({
      el: '#chart_' + i,
      yName: `单位: ${this.unitArr[i]}`,
      yMax: this.maxValArr[i],
      yMin: this.minValArr[i],
    })
    chart.initChart()
    this.chartInstanceArr.push(chart)
  } */
  // 这里用 eval, 主要是模仿上一行的 push 来存临时数据
  varObj['var_' + y] = eval('var_' + y)
}
console.log('varObj: ', varObj)
console.log('JSON.stringify(varObj): ', JSON.stringify(varObj))




/**
 * 网上推荐的大多是数组方案
 * 类似于 this.chartInstanceArr.push(chart)
 * this.chartInstanceArr[i] 取出相应的(变量)值
 */