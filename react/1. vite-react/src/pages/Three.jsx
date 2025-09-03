import Avatar from "../components/Avatar"

export default function Three(props) {
  return (
    <>
      <h1>传递props多个k</h1>
      <Avatar {...props} />
    </>
  )
}