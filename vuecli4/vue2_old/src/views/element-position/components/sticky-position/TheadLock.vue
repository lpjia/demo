<script>
export default {
  name: 'TheadLock',
  data() {
    return {
      list: []
    };
  },
  mounted() {
    this.getList()
  },
  methods: {
    async getList() {
      const url = "http://rap2api.taobao.org/app/mock/288967/api/table"
      const response = await fetch(url);
      if (!response.ok) throw new Error('response failed')
      const res = await response.json();
      // res 就是接口返回的 json 数据
      this.list = res.data
    }
  },
};
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>Name</th>
          <th>Favorite Color</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="item in list" :key="item.id">
          <td>{{ item.name }}</td>
          <td>{{ item.color }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped lang="scss">
// 需要注意的是，sticky必须设在<th>元素上面，不能设在<thead>和<tr>元素，因为这两个元素没有relative定位，也就无法产生sticky效果。
th {
  position: sticky;
  background-color: black;
  color: white;
  top: 0;
}
</style>
