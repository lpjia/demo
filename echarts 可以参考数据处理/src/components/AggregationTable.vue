<template>
  <el-table
    :data="data"
    border
    style="width: 100%"
  >
    <el-table-column
      v-for="item of cols"
      :key="item.label"
      :width="item.width"
      :prop="item.prop"
      :type="item.type"
      :label="item.label">
      <template v-slot="{row}" v-if="!item.type">
        <span v-if="item.prop">
          {{ row[item.prop] }}
        </span>
        <div
          style="margin-left: 10px"
          v-else-if="item.label === 'DAU'"
        >
          {{ row.daus }}
          <span
            v-if="row.daus > 0"
            :style="{ 'color': ((row.daus/row.lastDaus*100)-100).toFixed(2) > 0 ? 'red' : 'green' }"
            :class="((row.daus/row.lastDaus*100)-100).toFixed(2) > 0 ? 'el-icon-top' : 'el-icon-bottom'"
          >
           {{ ((row.daus / row.lastDaus * 100) - 100).toFixed(2) }}%
           </span>
        </div>
        <div
          style="margin-left: 10px"
          v-else-if="item.label === 'ARS安装量'"
        >
          {{ row.installCount }}
          <span
            v-if="row.installCount > 0"
            :style="{ 'color': ((row.installCount/row.lastInstallCount*100)-100).toFixed(2) > 0 ? 'red' : 'green' }"
            :class="((row.installCount/row.lastInstallCount*100)-100).toFixed(2) > 0 ? 'el-icon-top' : 'el-icon-bottom'"
          >
           {{ ((row.installCount / row.lastInstallCount * 100) - 100).toFixed(2) }}%
           </span>
        </div>
        <div
          style="margin-left: 10px"
          v-else-if="item.label === '自然量'"
        >
          {{ row.organicInstall }}
          <span
            v-if="row.organicInstall > 0"
            :style="{ 'color': ((row.organicInstall/row.lastOrganicInstall*100)-100).toFixed(2) > 0 ? 'red' : 'green' }"
            :class="((row.organicInstall/row.lastOrganicInstall*100)-100).toFixed(2) > 0 ? 'el-icon-top' : 'el-icon-bottom'"
          >
           {{ ((row.organicInstall / row.lastOrganicInstall * 100) - 100).toFixed(2) }}%
           </span>
        </div>
      </template>
    </el-table-column>
  </el-table>
</template>

<script>
export default {
  name: 'AggregationTable',
  props:['data','cols']
}
</script>

<style scoped>

</style>
