<template>
  <div>
    <el-form ref="form" :model="form" label-width="150px" size="mini" style="width:600px;">
      <el-form-item label="文化课分数:" prop="whk">
        <el-input v-model="form.whk"></el-input>
      </el-form-item>
      <el-form-item label="专业课分数:" prop="zyk">
        <el-input v-model="form.zyk"></el-input>
      </el-form-item>
      <el-form-item label="原总分:">
        <el-input v-model="form.zf"></el-input>
      </el-form-item>
      <el-form-item label="文化课比例:">
        <button @click.prevent="clear0">清0</button>
        <el-input ref="refWhkbl" v-model="form.whkbl"></el-input>
      </el-form-item>
      <el-form-item label="专业课比例:">
        <el-input v-model="form.zykbl"></el-input>
      </el-form-item>
      <el-form-item label="投档分数:">
        <el-input v-model="form.td"></el-input>
      </el-form-item>
      <el-form-item label="计算出的分数:">
        <el-input v-model="form.result"></el-input>
      </el-form-item>
      <button @click.prevent="calc">计算</button>
      <!-- <button @click.prevent="add">添加</button> -->
    </el-form>

    <div class="treeSection">
      <JsonViewer :value="dataList" :expand-depth="10" />
    </div>
  </div>
</template>

<script>
import JsonViewer from 'vue-json-viewer'
import {
  setStorage, getStorage, removeStorage,
  clearStorage, $toFixed
} from '@/utils/commonMethods.js'

export default {
  name: 'BaokaoXx',
  components: {
    JsonViewer,
  },
  props: {

  },
  data() {
    return {
      dataList: [
        {
          id: 1,
          name: 'one',
          bool: true
        }
      ],
      form: {
        whk: '356',
        zyk: '213',
        zf: '',
        td: '',
        whkbl: '',
        zykbl: '',
        result: ''
      }
    };
  },
  computed: {

  },
  watch: {

  },
  created() {

  },
  mounted() {
    this.form.zf = Number(this.form.whk) + Number(this.form.zyk)
  },
  methods: {
    add() {
      let res = getStorage('data') || []

      // let newArr = [],
      //   arrId = [];
      // for (let item of res) {
      //   if (arrId.indexOf(item['xx']) === -1) {
      //     arrId.push(item['xx']);
      //     newArr.push(item);
      //   }
      // }

      // 先把原数组弄出来, 然后再

      res.push(this.form)
      this.dataList = res
      setStorage('data', res)
    },
    calc() {
      this.form.result = $toFixed(this.form.whk * (this.form.whkbl / 100) +
        this.form.zyk * (this.form.zykbl / 100))
    },
    clear() {
      clearStorage()
    },

    clear0() {
      this.form.whkbl = ''
      this.$refs.refWhkbl.focus()
    }
  },
};
</script>

<style scoped lang="scss">
.treeSection {
  text-align: left;
  display: flex;
  // justify-content: center;
}
</style>
