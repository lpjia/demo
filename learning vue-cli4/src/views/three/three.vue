<template>
  <div>
    <h3 class="up_down">{{ pageName }}</h3>
    <h4>注册</h4>
    <div class="formSection">
      <el-form ref="form" :model="form" :rules="rules" label-width="80px" size="mini" style="width:300px;">
        <el-form-item label="商品名" prop="productName">
          <el-input v-model="form.productName"></el-input>
        </el-form-item>
        <el-form-item label="单价" prop="unitPrice">
          <el-input v-model="form.unitPrice"></el-input>
        </el-form-item>
        <el-form-item label="计价单位" prop="unit">
          <el-select v-model="form.unit" placeholder="请选择" size="mini" value-key="form_unit" style="width:100%">
            <el-option v-for="item in unitArr" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商店名" prop="shopName">
          <el-select v-model="form.shopName" @change="changePosition" placeholder="请选择" size="mini"
            value-key="form_shopName" style="width:100%">
            <el-option v-for="item in shopNameArr" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置" prop="position">
          <el-select v-model="form.position" disabled placeholder="请选择" size="mini" value-key="form_position"
            style="width:100%">
            <el-option v-for="item in positionArr" :key="item.value" :label="item.name" :value="item.value">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input v-model="form.spec"></el-input>
        </el-form-item>
        <el-form-item label="折扣价" prop="discountPrice">
          <el-input v-model="form.discountPrice"></el-input>
        </el-form-item>
        <el-form-item label="折扣" prop="discountRate">
          <el-input v-model="form.discountRate"></el-input>
        </el-form-item>
        <button @click.prevent="sure">提交</button>
      </el-form>

    </div>
    <p>{{ msg }}</p>
  </div>
</template>

<script>
import {
  commodityCreate,
  // commodityList,
  // commodityById
} from '@/api/three.js'
import { getStorage, setStorage, objToArr } from '@/utils'

export default {
  name: 'three',
  components: {
  },
  props: {
  },
  data() {
    return {
      pageName: 'three.vue',
      msg: '',
      form: {
        productName: '',
        unitPrice: '',
        shopName: '',
        discountPrice: '',
        discountRate: '',
        unit: '',
        spec: '',
        position: '',
      },
      rules: {
        productName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        shopName: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        unitPrice: [
          { required: true, message: '请输入', trigger: 'blur' }
        ],
        unit: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
        position: [
          { required: true, message: '请选择', trigger: 'change' }
        ],
      },

      unitArr: [],
      unitObj: {
        0: '￥/kg',
        1: '￥/个',
        2: '￥/瓶',
        3: '￥/包',
        4: '￥/条',
        5: '￥/组',
      },

      shopNameArr: [],
      shopNameObj: {
        0: '金梧桐长椿店',
        1: '怡亩田乡超市',
        2: '蔬便利万和城店',
      },

      positionArr: [],
      positionObj: {
        0: '万和城D区东门对面',
        1: '万和城D区东门对面往南',
        2: '万和城A区西门往北',
      },
    };
  },
  computed: {
  },
  watch: {
  },
  created() {
  },
  mounted() {
    const productForm = getStorage('productForm', window.localStorage)
    if (productForm) this.form = productForm

    this.init()
  },
  methods: {
    async createCommodity() {
      const { productName, unitPrice, shopName,
        unit, discountPrice, discountRate,
        spec, position } = this.form

      const params = {
        productName,
        shopName: this.shopNameObj[shopName],
        // unitPrice: +unitPrice,
        unitPrice,
        unit: this.unitObj[unit],
        // discountPrice: discountPrice ? +discountPrice : '',
        // discountRate: discountRate ? +discountRate : '',
        discountPrice,
        discountRate,
        spec,
        position: this.positionObj[position]
      }
      const res = await commodityCreate(params)
      this.msg = res
      setStorage('productForm', this.form, window.localStorage)
    },
    sure() {
      this.$refs['form'].validate(valid => {
        if (valid) {
          this.createCommodity()
        }
      })
    },

    init() {
      this.unitArr = objToArr(this.unitObj, { l: 'name', v: 'value' })
      this.shopNameArr = objToArr(this.shopNameObj, { l: 'name', v: 'value' })
      this.positionArr = objToArr(this.positionObj, { l: 'name', v: 'value' })
    },

    changePosition(val) {
      this.form.position = val
    },
  },
};
</script>

<style scoped lang="scss">
.formSection {
  display: flex;
  justify-content: center;
}

// label {
//   display: inline-block;
//   width: 100px;
//   text-align: right;
//   margin-right: 10px;
// }
// .register {
//   padding-right: 22px;
// }
</style>
