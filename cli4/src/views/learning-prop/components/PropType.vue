<script>
export default {
  name: 'PropType', // prop 类型
  props: {
    name: String,
    type: String,
    title: String,
    likes: Number,
    isPublished: Boolean,
    commentIds: Array,
    author: Object,
    callback: Function,
    contactsPromise: Promise
  },
  methods: {
    log() {
      console.log(this.contactsPromise)

      this.contactsPromise.then(res => {
        console.log(res)
      })

      this.contactsPromise.catch(res => {
        console.log(res)
      })

      this.contactsPromise.finally(() => {
        console.log('finally 无形参 终会执行')
      })
    },
  },
};
</script>

<template>
  <div>
    <!-- 每个 prop 都有指定的值类型 -->
    <span class="inlineB">{{ title }}</span>
    <span class="inlineB marginLB">{{ type }}</span>
    <span class="inlineB marginLB">{{ name }}</span>
    <span class="inlineB marginLB">{{ likes }}</span>
    <span class="inlineB marginLB">{{ isPublished }}</span>
    <span class="inlineB marginLB">{{ commentIds }}</span>
    <span class="inlineB marginLB">{{ author }}</span>
    <button class="inlineB marginLB" @click="callback">callback() 调用</button>
    <button class="inlineB marginLB" @click="log">contactsPromise</button>
  </div>
</template>