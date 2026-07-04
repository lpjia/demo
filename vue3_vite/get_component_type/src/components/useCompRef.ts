import { ref } from 'vue';

// // 初次封装
// export function useCompRef<T extends abstract new (...args: any) => any>() {
//   return ref<InstanceType<T>>()
// }


export function useCompRef<T extends abstract new (...args: any) => any>(_comp: T) {
  /* 形参给类型T, 用来类型推导
  形参本来是值, 推导出其类型T, 可以不用typeof了
  comp形参声明了但没使用
  _comp就没问题了 */
  return ref<InstanceType<T>>()
}
