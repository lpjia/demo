// props支持对象解构
/* export default function MyShareButton(props) {
  return (
    <button onClick={props.handleClick}>
      点了 {props.count} 次
    </button>
  )
} */
export default function MyShareButton({ count, handleClick }) {
  return (
    <button onClick={handleClick}>
      点了 {count} 次
    </button>
  )
}