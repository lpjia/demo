export { }

interface PointPoint {
  new(x: number, y: number): PointPoint
}
/* 构造签名
new C  
new C ( ... )  
new C < ... > ( ... ) */




interface Point {
  x: number
  y: number
}
interface PointConstructor {
  new(x: number, y: number): Point
}
// 构造签名在class中不能implements
class Point2D implements Point {
  constructor(readonly x: number, readonly y: number) {
    this.x = x
    this.y = y
  }
}


new Point2D(1, 2)


// 工厂函数
// 其实使用ts, 一般写好参数类型就行, 有返回值类型的可以用类型推导出来
function newPoint(pointC: PointConstructor, x: number, y: number) {
  /* 构造函数的类型
  pointC其实是构造函数, 其类型要有构造签名 */
  return new pointC(x, y)
}
// Point2D没有构造签名, 报错
// function newPoint2(pointC: Point2D, x: number, y: number) {
//   return new pointC(x, y)
// }
function newPoint2(pointC: typeof Point2D, x: number, y: number) {
  return new pointC(x, y)
}


const point: Point = newPoint(Point2D, 1, 2)
const point2: Point = newPoint2(Point2D, 2, 3)