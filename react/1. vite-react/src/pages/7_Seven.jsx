import { useState } from 'react'
import { useImmer } from 'use-immer'
import BucketList from "../components/BucketList"

function HookUseState() {
  const [person, setPerson] = useState({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  const handleClick = () => {
    /* 改变层级深的属性时, ...得用很多次, 且保证层级一致, 很麻烦 */
    setPerson({
      ...person,
      artwork: {
        ...person.artwork,
        city: 'Beijing ' + Math.random()
      }
    })
  }

  return (
    <>
      <button onClick={handleClick}>改变city</button>
      <p>name: {person.name}</p>
      <ul>
        <li>{person.artwork.title}</li>
        <li>{person.artwork.city}</li>
        <li>{person.artwork.image}</li>
      </ul>
    </>
  )
}

function HookUseImmer() {
  const [person, setPerson] = useImmer({
    name: 'Niki de Saint Phalle',
    artwork: {
      title: 'Blue Nana',
      city: 'Hamburg',
      image: 'https://i.imgur.com/Sd1AgUOm.jpg',
    }
  });

  const handleClick = () => {
    /* 改变层级深的属性时, 比useState简单很多 */
    setPerson(draft => {
      draft.artwork.city = 'Shanghai ' + Math.random()
    })

  }

  return (
    <>
      <button onClick={handleClick}>改变city</button>
      <p>name: {person.name}</p>
      <ul>
        <li>{person.artwork.title}</li>
        <li>{person.artwork.city}</li>
        <li>{person.artwork.image}</li>
      </ul>
    </>
  )
}

export default function Seven() {

  return (
    <div>
      <HookUseState />
      <HookUseImmer />
      {/* useImmer比useState对数组的更优处理 */}
      <BucketList />
    </div>
  )
}