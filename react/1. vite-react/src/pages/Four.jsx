import Avatar from "../components/Avatar"

/* 子组件 定义还是放到父组件外面 */
function ChaCao({ children }) {
  return (
    <div>
      {children}
    </div>
  )
}

function Comp({ children }) {
  return <>{children}</>
}
function Comp2({ ccc }) {
  return <>{ccc}</>
}

export default function Four(props) {
  return (
    <>
      <h1>插槽(vue说法)</h1>
      <ChaCao>
        <Avatar {...props} />
      </ChaCao>
      <h3>使用props默认属性 children</h3>
      <Comp children={<Avatar {...props} />} />
      <h3>使用props自定义属性 ccc</h3>
      <Comp2 ccc={<Avatar {...props} />} />
    </>
  )
}