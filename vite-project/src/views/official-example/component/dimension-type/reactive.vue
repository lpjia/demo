<script setup lang="ts">
/**
 * 为 reactive() 标注类型
 */
interface Book {
  title: string
  year?: number
}

const book: Book = reactive({
  title: 'Vue 3 指引'
})
</script>