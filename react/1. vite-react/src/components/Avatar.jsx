import reactLogo from '../assets/react.svg'
import '../styles/OldApp.css'

// console.log(reactLogo) // 导入进来一个绝对路径

export default function Avatar(props) {
  // console.log(reactLogo) // 导入进来一个绝对路径

  return (
    <>
      <img src={reactLogo} className="logo react" alt="React logo" />
      <div>{JSON.stringify(props)}</div>
    </>
  )
}