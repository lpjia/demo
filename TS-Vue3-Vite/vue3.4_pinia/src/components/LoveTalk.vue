<template>
  <div class="talk">
    <button @click="getLoveTalk">获取一句土味情话</button>
    <ul>
      <li v-for="talk in talkList" :key="talk.id">
        {{ talk.title }}
      </li>
    </ul>
  </div>
</template>

<script setup lang='ts' name="LoveTalk">
import { useTalkStore } from '@/store/talk';
import { storeToRefs } from 'pinia';

/* const talkList = reactive([
  { id: '1001', title: '今天你有点怪, 哪里怪? 怪好看的!' },
  { id: '1002', title: '草莓、蓝莓、蔓越莓, 你想我了没?' },
  { id: '1003', title: '心里给你留了一块地, 我的死心塌地' },
]) */
const talkStore = useTalkStore()
// console.log('talkStore:', talkStore)
const { talkList } = storeToRefs(talkStore) // 解构保持响应式

function uuid() {
  let urlObj = URL.createObjectURL(new Blob())
  let randomStr = urlObj.slice(-36)
  // 手动释放内存
  URL.revokeObjectURL(urlObj)
  urlObj = null as unknown as string
  return randomStr
}
const getLoveTalk = async () => {
  const result = await (await fetch('https://api.uomg.com/api/rand.qinghua?format=json')).json() // 土味情话地址
  console.log('result:', result)
  if (result.code === 1) {
    // talkList使用storeToRefs解构后是个ref, 所以得.value
    talkList.value.unshift({
      id: uuid(),
      title: result.content
    })
  }
}
</script>

<style scoped lang="scss">
.talk {
  background-color: orange;
  padding: 10px;
  border-radius: 10px;
  box-shadow: 0 0 10px;
}
</style>
