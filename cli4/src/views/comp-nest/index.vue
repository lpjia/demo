<template>
  <div>
    <section v-for="item in nestArr" :key="item.id">
      <NestItem :obj="item" />
    </section>
  </div>
</template>

<script>
import NestItem from './components/NestItem.vue'

export default {
  name: 'CompNest', // 组件嵌套
  components: {
    NestItem
  },
  data() {
    return {
      // 这样方便复用
      nestArr: [
        {
          title: 'level-1',
          id: 11,
          children: [
            {
              title: 'level-2',
              id: 21,
              children: [
                {
                  title: 'level-3',
                  id: 31,
                }
              ]
            },
          ]
        },
      ]
    };
  },
};
</script>
