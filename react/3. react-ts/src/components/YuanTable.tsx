import styles from '../styles/ProductTable.module.scss'
import { useRef } from 'react'

// 怎么组装字段成函数
const obj = {
  aaa: () => { },
  bbb: () => { },
  ccc: () => { },
}
const dataFromFetch = [
  {
    id: 11,
    value: [],
    lastColumns: [
      {
        title: '编辑',
        color: 'green',
        handleClick() {
          console.log('编辑')
        }
      },
      {
        title: '详情',
        color: 'blue',
        handleClick() {
          console.log('详情')
        }
      },
    ]
  },
]

const data = [
  {
    id: 11,
    value: [],
    lastColumns: [
      {
        title: '编辑',
        color: 'green',
        handleClick() {
          console.log('编辑')
        }
      },
      {
        title: '详情',
        color: 'blue',
        handleClick() {
          console.log('详情')
        }
      },
    ]
  },
  {
    id: 22,
    value: [],
    lastColumns: [
      {
        title: '编辑',
        color: 'green',
        handleClick() {
          console.log('编辑')
        }
      },
      {
        title: '详情',
        color: 'blue',
        handleClick() {
          console.log('详情')
        }
      },
      {
        title: '删除',
        color: 'red',
        handleClick() {
          console.log('删除')
        }
      },
    ]
  },

]

type RowProps = {
  id: number;
  row: typeof data[number]
}

function Row({ id, row }: RowProps) {
  const myRef = useRef(null)

  const itemsRef = useRef<Map<any, any> | null>(null);

  function getMap() {
    if (!itemsRef.current) {
      // 首次运行时初始化 Map。
      itemsRef.current = new Map();
    }
    return itemsRef.current;
  }

  return (
    <tr>
      <td ref={myRef} onClick={() => {
        console.log(myRef);
        console.log(myRef.current)
      }}>
        {id}
      </td>

      <td style={{ display: 'flex', justifyContent: 'center' }}>
        {row.lastColumns.map((btn) => {
          return (
            <button
              key={btn.title}
              className={`btn ${styles[btn.color]}`}
              onClick={btn.handleClick}
              ref={(node) => {
                const map = getMap()
                map.set(btn, node);
                /* return () => {
                  map.delete(btn);
                }; */
              }}
            >
              {btn.title}
            </button>
          )
        })}
      </td>
    </tr>
  )
}

function YuanTable() {
  const rows: JSX.Element[] = []

  data.map((row, i) => {
    rows.push(<Row key={row.id} id={i + 1} row={row} />)
  })

  return (
    <table className={styles.tb}>
      <thead>
        <tr>
          <th>id</th>
          <th>操作</th>
        </tr>
      </thead>
      <tbody>
        {rows}
      </tbody>
    </table>
  )
}

export default YuanTable;