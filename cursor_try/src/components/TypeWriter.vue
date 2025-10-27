<script setup lang="ts">
import { ref, onMounted, watch } from 'vue'

const props = defineProps<{
  text: string
  delay?: number
}>()

const displayText = ref('')
let currentIndex = 0
let timeoutId: NodeJS.Timeout | null = null

const typeText = () => {
  if (currentIndex < props.text.length) {
    displayText.value += props.text[currentIndex]
    currentIndex++
    timeoutId = setTimeout(typeText, props.delay || 30)
  }
}

const resetTyping = () => {
  if (timeoutId) clearTimeout(timeoutId)
  displayText.value = ''
  currentIndex = 0
  typeText()
}

watch(() => props.text, resetTyping)

onMounted(typeText)
</script>

<template>
  <span>{{ displayText }}<span class="typing-cursor">|</span></span>
</template>

<style scoped>
.typing-cursor {
  animation: blink 1s step-end infinite;
  font-weight: 200;
  color: var(--primary-color);
}

@keyframes blink {

  from,
  to {
    opacity: 1;
  }

  50% {
    opacity: 0;
  }
}
</style>