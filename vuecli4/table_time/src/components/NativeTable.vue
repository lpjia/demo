<script>
import dayjs from 'dayjs'
// // 局部引入 中文包
// import 'dayjs/locale/zh-cn'
// dayjs.locale('zh-cn')

import relativeTime from 'dayjs/plugin/relativeTime'
dayjs.extend(relativeTime)

export default {
  name: 'NativeTable',
  computed: {
    msg() {
      return new Date()
    },
    msg_2() {
      return dayjs()
    },
    msg_3() {
      return dayjs.locale()
    },
    msg_4() {
      return dayjs().from(dayjs('1993-11-18'))
    },
  },
};
</script>

<template>
  <div>
    <table>
      <thead>
        <tr>
          <th>描述</th>
          <th>值</th>
        </tr>
      </thead>
      <tbody>
        <tr>
          <!-- tr 标签是每一行的内容 -->
          <td>new Date()</td>
          <td>{{ msg }}</td>
        </tr>
        <tr>
          <td>dayjs()</td>
          <td>{{ msg_2 }}</td>
        </tr>
        <tr>
          <td>dayjs.locale()<br>查看当前语言配置</td>
          <td>{{ msg_3 }}</td>
        </tr>
        <tr>
          <td>距离我出生</td>
          <td>{{ msg_4 }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
table {
  border-collapse: collapse;
  width: 90%;
}

th,
td {
  font-weight: normal;
  padding: 10px;
  border: 4px solid deepskyblue;
}
</style>
