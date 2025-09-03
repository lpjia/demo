function Item({ name, isPacked }) {
  // if (isPacked) {
  //   return <li className="item">{name} ✅</li>; // 冗rong长
  // }
  // return <li className="item">{name}</li>;


  // return <li className="item">{name} {isPacked ? '✅' : ''}</li>

  // return <li className="item">{isPacked ? name + ' ✅' : name}</li>

  // return <li className="item">{name} {isPacked && '✅'}</li>


  let itemCtt = name // 最冗长的, 也最灵活
  if (isPacked) {
    // itemCtt = name + ' ✅'
    itemCtt = <del>{name + " ✅"}</del>
  }
  return <li className="item">{itemCtt}</li>;
}

export default function PackingList() {
  return (
    <section>
      <h1>Sally Ride 的行李清单</h1>
      <ul>
        <Item
          isPacked={true}
          name="宇航服"
        />
        <Item
          isPacked={true}
          name="带金箔的头盔"
        />
        <Item
          isPacked={false}
          name="Tam 的照片"
        />
      </ul>
    </section>
  );
}