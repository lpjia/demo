// 问题: 怎么限制对象数组中的类型
// 思路: 先限制对象, 再限制数组
interface IOne {
  id: number,
  name: string,

}

let arr2:IOne[] = [{id:1,name:'one'}]


async function updateBreakPoints(removeList: IOne[], addList?: IOne[]) {
  try {
    console.log('removeList: ', removeList)
    await fetch('')
  } catch (error) {
    
  }
}

updateBreakPoints(arr2)