import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

export const useThemeStore = defineStore('theme', () => {
  const isDark = ref(localStorage.getItem('theme') === 'dark')

  // 监听主题变化并保存到 localStorage
  watch(isDark, (val) => {
    localStorage.setItem('theme', val ? 'dark' : 'light')
    updateTheme()
  })

  // 更新主题
  function updateTheme() {
    if (isDark.value) {
      document.documentElement.classList.add('dark')
    } else {
      document.documentElement.classList.remove('dark')
    }
  }

  // 切换主题
  function toggleTheme() {
    isDark.value = !isDark.value
  }

  // 初始化主题
  updateTheme()

  return {
    isDark,
    toggleTheme
  }
}) 