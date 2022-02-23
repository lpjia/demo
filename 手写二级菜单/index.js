
/**
 * 用原生来控制二级菜单的显示隐藏
 * 当二级菜单离一级菜单有一定距离时
 * 怎么保持二级菜单的显示
 * 有次面试说加定时, 暂时没有实现出来
 * 有空继续研究
 */

const doms = document.querySelectorAll('.oneLevel>li')
const domsChild = document.querySelectorAll('.twoLevel')

// for (let item of doms) {
//   item.onmouseover = e => {
//     console.log('e:', e)
//     console.log('item:', item)
//     item.lastChild.style.display = 'block'
//     setTimeout(() => {
//       item.lastChild.style.display = 'none'
//     }, 2000)
//   }
// }
const divShowArr = []
let jishiqi = null

for (let item of doms) {
  let div = null

  item.addEventListener('mouseover', e => {
    console.log('item:', item)
    console.log('item.childNodes:', item.childNodes)
    div = item.childNodes[2]
    if (divShowArr.length > 0) {
      // 隐藏已显示的子菜单
      let divShow = divShowArr.pop()
      divShow.style.display = 'none'
      clearTimeout(jishiqi)
    } else {
      div.style.display = 'block'
      divShowArr.push(div)
    }

    // item.addEventListener('mouseout', e => {
    //   jishiqi = setTimeout(() => {
    //     div.style.display = 'none'
    //     // item.removeEventListener('mouseover')
    //   }, 2000)
    // })


  })


  item.addEventListener('mouseout', e => {

    jishiqi = setTimeout(() => {
      div.style.display = 'none'

      // item.removeEventListener('mouseover')

    }, 2000)


  })



  // child.addEventListener('mouseover', e => {
  //   console.log('child:', child)
  //   clearTimeout(jishiqi)
  //   child.style.display = 'block'

  //   child.addEventListener('mouseout', e => {
  //     child.style.display = 'none'
  //   })
  // })




}





// for (let child of domsChild) {
// }


// let jishiqi = null
// console.log(1)
// jishiqi = setTimeout(() => {
//   console.log(2)
// }, 10000)
// clearTimeout(jishiqi)