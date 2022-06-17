<template>
  <div>
    <button v-for="(item, idx) in dynamicSlotList" :key="idx" @click="switchSlot(item.slotName)"
      style="margin-right: 10px;">
      {{ item.slotName }}</button>
    <ChildOne>
      <!-- 不访问子组件的数据, 这种写法也可以 -->
      <!-- <template v-slot:[dynamic]> -->
      <!-- <template #[dynamic]> -->
      <!-- <template #[dynamic]="xxx"> -->

      <!-- 动态的插槽名在 dom 模版中, 会被直接转为全小写, dynamicSlotName 驼峰式命名变量就报错了 -->
      <template v-slot:[dynamic]="{ data }">
        我是父组件 ---- {{ data }}
      </template>
    </ChildOne>
  </div>
</template>

<script>
import ChildOne from './ChildOne.vue'
export default {
  name: 'DynamicSlot',
  components: {
    ChildOne
  },
  data() {
    return {
      dynamicSlotList: [
        { slotName: 'default' },
        { slotName: 'slot_1' },
        { slotName: 'slot_2' },
        { slotName: 'slotTuoFeng' },
      ],
      dynamic: 'default'
    };
  },
  methods: {
    switchSlot(slotName) {
      this.dynamic = slotName
    }
  },
};
</script>

<style scoped lang="scss">
</style>
