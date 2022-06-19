// import { reactive, toRefs, computed } from "vue";

export default function () {
  const state = reactive({
    arr: [
      { idx: 1 },
      { idx: 2 },
      { idx: 3 },
    ],
    n2: computed(
      () => {
        return state.arr.map(item => item.idx * 2)
      }
    ),
    n3: computed(
      () => {
        return state.arr.map(item => {
          return { idx: item.idx * 2 }
        })
      }
    )
  })

  const changeArr = () => {
    let tempArr = []
    state.arr.forEach(item => {
      tempArr.push({
        idx: item.idx + 1
      })
    })
    state.arr = tempArr
  }

  return {
    ...toRefs(state),
    changeArr
  }
}