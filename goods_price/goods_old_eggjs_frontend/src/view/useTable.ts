import type { FormData } from '@/view/Home.vue'
import { ref } from 'vue';
import type { Ref } from 'vue';
import type { ProductListWithPrice } from "@/types/index"
import { getProductListWithPriceByName } from '@/api';
import dayjs from 'dayjs';

interface TableItem extends Omit<FormData, 'position' | 'positionAlias' | 'buyTime'> {
  unitName: string;
  priceHistoryId: number;
  buyTime: string;
  position?: string
}

export function useTable(form: FormData, productListMap: Ref) {
  const tableData = ref<TableItem[]>([])
  const searchForSimilarProducts = async () => {
    const productListWithPrice = await getProductListWithPriceByName(productListMap.value[form.productId!]) as unknown as ProductListWithPrice[]
    tableData.value.length = 0

    for (const product of productListWithPrice) {
      const { productName, productAlias, shopId,
        shopInfo, priceHistoryList } = product
      const { shopName, shopAlias, position } = shopInfo

      let obj = {
        productName,
        productAlias,
        shopId,
        shopName,
        shopAlias,
        position
      }

      for (const priceItem of priceHistoryList) {
        const { productId, price, unitId,
          unitInfo: { unitName }, spec, note,
          id: priceHistoryId, buyTime } = priceItem

        tableData.value.push({
          ...obj,
          productId: productId as any,
          price,
          unitName,
          unitId,
          spec,
          note,
          priceHistoryId,
          buyTime: dayjs(buyTime).format('YYYY-MM-DD'),
        })
      }
    }
  }

  const fillForm = (currentRow: FormData) => {
    form.price = currentRow.price
    form.unitId = Number(currentRow.unitId) as unknown as string
    form.shopId = Number(currentRow.shopId) as unknown as string
    form.spec = currentRow.spec
    form.note = currentRow.note
    form.productAlias = currentRow.productAlias
    form.shopAlias = currentRow.shopAlias
    form.position = currentRow.position
  }

  return {
    tableData,
    searchForSimilarProducts,
    fillForm,
  }
}