/* React 的渲染过程必须自始至终是纯粹的。组件应该只返回它们的JSX，而不改变在渲染前，就已存在的任何对象或变量 */

/* let guest = 0;

function Cup() {
  // Bad：正在更改预先存在的变量！
  guest = guest + 1;
  return <h2>Tea cup for guest #{guest}</h2>;
}
// 多次调用这个组件会产生不同的 JSX, 不纯粹
// 在StrictMode严格模式下, 组件将额外重新渲染一次来检查是不是纯(函数)渲染
  
export default function TeaSet() {
  return (
    <>
      <Cup />
      <Cup />
      <Cup />
    </>
  );
} */


/* 把组件改为纯粹的 */
function Cup({ guest }) {
  return <h2>Tea cup for guest #{guest}</h2>; // 返回的 JSX 只依赖于 guest prop
}
// 无论组件渲染多少次, 返回的 JSX 都不会改变主动guest的值, 只依赖传进来guest的值来渲染, 做到了纯(函数)渲染

function TeaSet() {
  return (
    <>
      <Cup guest={1} />
      <Cup guest={2} />
      <Cup guest={3} />
    </>
  );
}

function TeaGathering() {
  const cups = [];
  for (let i = 1; i <= 12; i++) {
    cups.push(<Cup key={i} guest={i} />);
  }
  return cups;
}
// 这里不会有影响，因为每次渲染时，你都是在 TeaGathering 函数内部创建的它们。TeaGathering 之外的代码并不会知道发生了什么。这就被称为 “局部 mutation” 

export default function Eight() {
  return (
    <>
      <TeaSet />
      {/* <TeaGathering /> */}
    </>
  )
}