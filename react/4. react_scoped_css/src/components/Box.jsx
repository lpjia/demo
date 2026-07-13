import Divv from './Divv'
import '../styles/Box.scoped.scss'

function Divi() {
  return (
    <>
      <div className="three">
        <i className='ziti'>字体颜色</i>
      </div>
    </>
  )
}

export default function Box() {
  return (
    <>
      <div className="wrap">Scoped 隔离样式</div>

      <Divi />

      <div className='two'>
        <Divv />
      </div>
    </>
  )
}
