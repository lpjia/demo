import { Fragment } from "react"
import MyButton from "../components/MyButton"
import '../styles/heisenberg.scss'

const list = [
  <MyButton key='1111'></MyButton>,
  <MyButton key='2222'></MyButton>,
  <MyButton key='3333'></MyButton>,
  <MyButton key='4444'></MyButton>,
]

const list2 = [
  { id: 10 },
  { id: 11 },
  { id: 12 },
  { id: 13 },
  { id: 14 },
]

const list3 = list2.filter(item => item.id !== 12)

function IfComp({ type }) {
  if (type === 'a') {
    return <button className={`${type} marginTopBottom`}>这是个{type}按钮</button>
  }
  else {
    return <button className={type} style={{ marginLeft: '10px' }}>这是个{type}按钮</button>
  }
}

export default function Five() {

  return (
    <>
      <h1 style={{ backgroundColor: 'deepskyblue', color: 'white' }}>数组里直接放组件</h1>
      <div className="bod">{list}</div>
      <h3>利用数组的map方法来渲染</h3>
      <div>
        {list2.map(item => {
          return <MyButton key={item.id} />
        })}
      </div>
      <h3>filter过滤了一些数据</h3>
      <div>
        {list3.map(item => {
          return (
            // <div key={item.id} >
            //   <MyButton />
            //   <span>{item.id}</span>
            // </div>

            <Fragment key={item.id} >
              <MyButton />
              <span>{item.id}</span>
            </Fragment>
          )
        })}
      </div>
      <h3>if判断</h3>
      <div className={`bod ${true ? 'a' : 'b'}`}>
        <IfComp type="a"></IfComp>
        <IfComp type="b"></IfComp>
        {false && <IfComp type="c"></IfComp>}
      </div >
    </>
  )
}
