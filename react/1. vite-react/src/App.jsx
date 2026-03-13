import One from "./pages/1_One"
import Two from "./pages/2_Two"
import Three from "./pages/3_Three"
import Four from "./pages/4_Four"
import Five from "./pages/5_Five"
import Six from "./pages/6_Six"
import { MyContext } from './utils/MyContext';
import { DataProvider, useProvider } from "./hooks/useProvider"
import PackingList from "./components/PackingList"
import Seven from "./pages/7_Seven"
import Eight from "./pages/8_Eight"
import { useState } from "react"

const a = 'aaa'
const b = 123
const c = { name: 'ccc' }
const d = [111, 222, 333]


export default function App() {
  // const sharedData = { msg: "Vite + React" }

  // const [msgObj, setMsgObj] = useState({ msg: "Vite + React" })

  const providerValue = useProvider({ text: 'src/App.jsx' })

  return (
    <>
      <One />
      <hr />
      <Two />
      <hr />
      <Three a={a} b={b} c={c} d={d} />
      <hr />
      <Four a={a} d={d} />
      <hr />
      <Five />
      <hr />
      {/* 提供Context */}

      {/* <MyContext.Provider value={sharedData}>
        <Six />
      </MyContext.Provider> */}

      {/* <MyContext.Provider value={{ msgObj, setMsgObj }}>
        <Six />
      </MyContext.Provider> */}

      {/* <hr /> */}

      <DataProvider value={providerValue}>
        <Six />
      </DataProvider>
      <p>{providerValue.data.text}</p>

      {/* <DataProvider value={providerValue.data}>
        <Six />
      </DataProvider>
      <p>{providerValue.data.text}</p> */}

      <hr />
      <div style={{ 'textAlign': 'left' }}>
        <PackingList />
        <hr />
        <Seven />
      </div>
      <hr />
      <Eight />

    </>
  )
}