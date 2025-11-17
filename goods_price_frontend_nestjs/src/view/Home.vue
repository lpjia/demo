<template>
  <div>
    <div class="sm:px-0 md:px-10">
      <el-table :data="tableData" max-height="300" border stripe style="width: 100%">
        <el-table-column type="expand">
          <template #default="props">
            <div class="px-5 py-2">
              <p>购买时间: {{ props.row.buyTime }}</p>
              <p>商品 id: {{ props.row.productId }}</p>
              <p>商店 id: {{ props.row.shopId }}</p>
              <p>价格历史 id: {{ props.row.priceHistoryId }}</p>
              <p>计价单位 id: {{ props.row.unitId }}</p>
              <p>商品别名: {{ props.row.productAlias }}</p>
              <p>商店别名: {{ props.row.shopAlias }}</p>
            </div>
          </template>
        </el-table-column>
        <el-table-column label="操作" align="center" width="80">
          <template #default="props">
            <el-button size="small" @click="fillForm(props.row)">应用</el-button>
          </template>
        </el-table-column>
        <el-table-column prop="productName" label="商品名" align="center" :show-overflow-tooltip="true" />
        <el-table-column prop="shopName" label="商店名" align="center" width="180" />
        <el-table-column prop="price" label="单价" align="center" width="80" />
        <el-table-column prop="unitName" label="计价单位" align="center" width="100" />
        <el-table-column prop="spec" label="规格" align="center" width="120" />
        <el-table-column prop="note" label="备注" align="center" width="180" />
      </el-table>
    </div>
    <div class="formSection mt-5">
      <el-form :model="form" ref="ruleFormRef" :rules="rules" label-width="auto">
        <el-form-item class="flex-center">
          <el-button type="primary" @click="submitForm(ruleFormRef)">提交</el-button>
          <el-button @click="resetForm(ruleFormRef)">Reset</el-button>
        </el-form-item>
        <el-form-item label="购买日期">
          <el-config-provider :locale="locale">
            <el-date-picker v-model="form.buyTime" type="date" value-format="YYYY-MM-DD HH:mm:ss"
              :placeholder="formPlaceholder.select" style="width: 100%;">
            </el-date-picker>
          </el-config-provider>
        </el-form-item>
        <div class="inline-form-item">
          <el-form-item label="商品名" prop="productId" class="productName" style="margin-right: 10px;">
            <el-select v-model="form.productId" filterable allow-create default-first-option clearable
              :placeholder="formPlaceholder.select">
              <el-option v-for="item in productList" :key="item.id" :label="item.productName" :value="item.id">
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item>
            <el-button type="primary" :disabled="!canSearchProduct" @click="searchForSimilarProducts">查同类商品</el-button>
          </el-form-item>
        </div>
        <el-form-item label="单价" prop="price">
          <el-input v-model="form.price" :placeholder="formPlaceholder.input" clearable></el-input>
        </el-form-item>
        <el-form-item label="计价单位" prop="unitId">
          <el-select v-model="form.unitId" :placeholder="formPlaceholder.select">
            <el-option v-for="item in unitList" :key="item.id" :label="item.unitName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="商店名" prop="shopId">
          <el-select v-model="form.shopId" :placeholder="formPlaceholder.select" @change="changeShop">
            <el-option v-for="item in shopList" :key="item.id" :label="item.shopName" :value="item.id">
            </el-option>
          </el-select>
        </el-form-item>
        <el-form-item label="位置" prop="position">
          <el-input v-model="form.position" disabled></el-input>
        </el-form-item>
        <el-form-item label="规格" prop="spec">
          <el-input v-model="form.spec" :placeholder="formPlaceholder.input" clearable></el-input>
        </el-form-item>
        <el-form-item :label="' '" style="color: orange;">
          <i>规格可填"散称"、"2L"、"5斤装"、"2大瓶"等</i>
        </el-form-item>
        <el-form-item label="备注">
          <el-input v-model="form.note" :placeholder="formPlaceholder.input" clearable></el-input>
        </el-form-item>
        <el-form-item :label="' '" style="color: orange;">
          <i>备注可填"特价"、"618活动"、"打5折"等</i>
        </el-form-item>
        <el-form-item label="商店别名" prop="shopAlias">
          <el-input v-model="form.shopAlias" disabled></el-input>
        </el-form-item>
        <el-form-item label="位置别名" prop="positionAlias">
          <el-input v-model="form.positionAlias" disabled></el-input>
        </el-form-item>
        <el-form-item label="商品别名" prop="productAlias">
          <el-input v-model="form.productAlias" :placeholder="formPlaceholder.input" clearable></el-input>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script setup lang='ts'>
import {
  getUnitList, getShopList, getProductList,
  addProductPriceHistory
} from '@/api';
import { computed, onMounted, reactive, ref } from 'vue';
import { formPlaceholder } from '@/utils/enum'
import type { Unit, Shop, Product } from "@/types/index"
import { getStorage, setStorage, arrToObj } from '@/utils/commonMethod';
import type { FormInstance, FormRules } from 'element-plus'
import { ElConfigProvider } from 'element-plus'
import zhCn from 'element-plus/es/locale/lang/zh-cn'
import { useTable } from './useTable'
// import { clone as $clone } from 'ramda'


let unitList = ref<Unit[]>([])
let shopList = ref<Shop[]>([])
let productList = ref<Product[]>([])
const productListMap = ref({})
getUnitList().then(res => {
  unitList.value = res as unknown as Unit[]
  unitList.value = unitList.value.sort((a: Unit, b: Unit) => Number(b.sortNum) - Number(a.sortNum))
})
getShopList().then(res => {
  shopList.value = res as unknown as Shop[]
  shopList.value = shopList.value.sort((a: Shop, b: Shop) => Number(b.sortNum) - Number(a.sortNum))
})
const getProductListHandler = () => {
  getProductList().then(res => {
    productList.value = res as unknown as Product[]

    // 过滤重复项
    const seenProductNames = ref(new Set())
    productList.value = productList.value.filter((item: Product) => {
      if (!seenProductNames.value.has(item.productName)) {
        seenProductNames.value.add(item.productName)
        return true
      }
      return false
    })

    // 转成map
    productListMap.value = arrToObj(productList.value, { kField: 'id', vField: 'productName' })
  })
}
getProductListHandler()


const locale = ref(zhCn)
const form = reactive({
  productName: '',
  productId: void 0,
  productAlias: '',
  price: '',
  unitId: '',
  buyTime: '',
  shopId: '',
  shopAlias: '',
  position: '',
  positionAlias: '',
  spec: '',
  note: '',
})
export type FormData = typeof form
const ruleFormRef = ref<FormInstance>()
const rules = reactive<FormRules<typeof form>>({
  productId: [
    { required: true, trigger: 'blur' }
  ],
  price: [
    { required: true, trigger: 'blur' }
  ],
  unitId: [
    { required: true, trigger: 'change' }
  ],
  buyTime: [
    { required: true, trigger: 'change', type: 'date' }
  ],
  shopId: [
    { required: true, trigger: 'change' },
  ],
  position: [
    { required: true, trigger: 'blur' },
  ]
})

const submitForm = async (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  await formEl.validate((valid, fields) => {
    if (valid) {
      console.log('submit!')
      if (typeof form.productId === 'number') {
        form.productName = productListMap.value[form.productId]
      }
      else if (typeof form.productId === 'string') {
        form.productName = form.productId
      }
      setStorage('productForm', form, window.localStorage)
      // console.log('form:', form)
      // return false
      addProductPriceHistory(form).then(res => {
        console.log('res:', res)
        ElMessage({
          message: res as unknown as string,
          type: 'success',
          plain: true,
        })
        getProductListHandler()
      })

    } else {
      console.log('error submit!', fields)
    }
  })
}
const resetForm = (formEl: FormInstance | undefined) => {
  if (!formEl) {
    return;
  }
  formEl.resetFields()
}
const changeShop = (v: number) => {
  for (const shop of shopList.value) {
    if (shop.id === v) {
      form.position = shop.position
      break;
    }
  }
}



/* productId 有3种情况, undefined number string
搜已有的商品id才能查到 */
const canSearchProduct = computed(() => typeof form.productId === 'number')

const { tableData, searchForSimilarProducts, fillForm } = useTable(form, productListMap)


onMounted(() => {
  const productForm = getStorage('productForm', window.localStorage)
  if (productForm) {
    Object.assign(form, { ...productForm })
  }
})

</script>

<style scoped lang="scss">
.formSection {
  display: flex;
  justify-content: center;

  .inline-form-item {
    display: flex;
    justify-content: space-around;

    .productName {
      width: 15rem;
    }
  }
}

@media screen and (max-width: 768px) {
  .formSection .inline-form-item {
    justify-content: start;

    .productName {
      width: 13rem;
    }
  }
}

.pointer {
  cursor: pointer;
}

.flex-center :deep(.el-form-item__content) {
  justify-content: center;
}
</style>
./useTable