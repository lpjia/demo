import { useState, useContext } from 'react'
import reactLogo from '../assets/react.svg'
import viteLogo from '/vite.svg'
import { MyContext } from '../utils/MyContext'
import { useInject } from '../hooks/useProvider'
// import '../styles/OldApp.module.css'
// import '../styles/OldApp.css'

export default function OldApp() {
  const [count, setCount] = useState(0)

  // const received = useContext(MyContext) // 使用Context
  // console.log(received)


  // const { msgObj, setMsgObj } = useContext(MyContext)


  // const data = useInject()

  const inject = useInject()
  // const clk = () => {
  //   // setCount(count + 1)
  //   setCount(c => c + 1)
  //   inject.setData({
  //     ...inject.data,
  //     text: inject.data.text + '6'
  //   })
  // }

  return (
    <>
      <div>
        <a href="https://vite.dev" target="_blank">
          <img src={viteLogo} className="logo" alt="Vite logo" />
        </a>
        <a href="https://react.dev" target="_blank">
          <img src={reactLogo} className="logo react" alt="React logo" />
        </a>
      </div>
      {/* <h1>{received.msg}</h1> */}

      {/* <h1 onClick={() => setMsgObj({ msg: '被改了' })}>{msgObj.msg}</h1> */}

      <div className="card">
        <button onClick={() => setCount((c) => c + 1)}>
          count is {count}
        </button>

        {/* <button onClick={clk}>
          count is {count}
        </button> */}

        <p>
          Edit <code onClick={() => inject.setData({ text: '也被改了' })}>{inject.data.text}</code> and save to test HMR
        </p>

        {/* <p>
          Edit <code>{data.text}</code> and save to test HMR
        </p> */}
      </div>
      <p className="read-the-docs">
        Click on the Vite and React logos to learn more
      </p>
    </>
  )
}