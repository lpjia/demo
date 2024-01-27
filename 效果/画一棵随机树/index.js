const canvas = document.querySelector('canvas')
const ctx = canvas.getContext('2d')

canvas.width = window.innerWidth * devicePixelRatio
canvas.height = window.innerHeight * devicePixelRatio

// 改变坐标系
ctx.translate(canvas.width / 2, canvas.height)
ctx.scale(1, -1)

function drawBranch(v0, length, thick, angle) {
  // 解决树比较茂盛, 更真实
  if (thick < 10 && Math.random() < 0.3) {
    return;
  }
  // 粗度过小就不画了, 否则无限递归
  if (thick < 2) {
    // 树枝不画了, 代表尽头, 画花
    ctx.beginPath()
    ctx.arc(...v0, 10, 0, 2 * Math.PI) // 画弧, 这里要画圆
    ctx.fillStyle = 'red'
    ctx.fill()
    return;
  }
  ctx.beginPath()
  ctx.moveTo(...v0) // 起点
  const v1 = calcV1(v0, length, angle)
  ctx.lineTo(...v1) // 终点
  ctx.lineWidth = thick;
  ctx.fillStyle = '#333'
  ctx.lineCap = 'round' // 终点长啥样, round是圆
  ctx.stroke() // 画
  // 向左
  drawBranch(v1, length * 0.8, thick * 0.8, angle + Math.random() * 30)
  // 向右
  drawBranch(v1, length * 0.8, thick * 0.8, angle - Math.random() * 30)
}
function calcV1(v0, length, angle) {
  // 角度和弧度互转, π相等于180°, A转B, 就A那个单位当分母
  const radian = angle * (Math.PI / 180)
    , xLength = length * Math.cos(radian)
    , x = v0[0] + xLength
    , yLength = length * Math.sin(radian)
    , y = v0[1] + yLength
  return [x, y]
}
drawBranch([0, 0], 160, 30, 90)