<script setup lang="ts">
import { Ref } from 'vue';
/**
 * 为 ref() 标注类型
 */

// 推导出的类型：Ref<string | number>
const year: Ref<string | number> = ref(2020)

// 推导得到的类型：Ref<number | undefined>
const n = ref<number>()

year.value = '2020' // 成功

</script>