<script setup lang="ts">
import { ref, nextTick, onMounted, watch } from 'vue'
import { useChatStore } from '@/stores/chat'
import { useThemeStore } from '@/stores/theme'
import type { ChatMessage } from '@/stores/chat'
import TypeWriter from '@/components/TypeWriter.vue'

const chatStore = useChatStore()
const themeStore = useThemeStore()
const newMessage = ref('')
const fileInput = ref<HTMLInputElement | null>(null)
const messageContainer = ref<HTMLDivElement | null>(null)

// 自动滚动到底部
const scrollToBottom = async () => {
  await nextTick()
  if (messageContainer.value) {
    messageContainer.value.scrollTop = messageContainer.value.scrollHeight
  }
}

// 监听消息变化并滚动
watch(() => chatStore.messages, scrollToBottom, { deep: true })

// 添加正在输入的消息ID跟踪
const typingMessageId = ref<number | null>(null)

// 修改发送消息函数
const sendMessage = async () => {
  if (!newMessage.value.trim()) return
  const msg = await chatStore.sendMessage(newMessage.value)
  newMessage.value = ''
  // 设置最新的AI回复消息为正在输入状态
  if (msg) {
    typingMessageId.value = msg.id + 1 // 预估的AI回复消息ID
  }
}

// 处理图片上传
const handleImageUpload = async (event: Event) => {
  const input = event.target as HTMLInputElement
  const file = input.files?.[0]
  if (file) {
    try {
      await chatStore.uploadImage(file)
    } catch (error) {
      alert(error instanceof Error ? error.message : '上传失败')
    }
    input.value = '' // 清空input以允许上传相同的文件
  }
}

// 格式化时间
const formatTime = (date: Date) => {
  return new Date(date).toLocaleTimeString('zh-CN', {
    hour: '2-digit',
    minute: '2-digit'
  })
}

onMounted(scrollToBottom)
</script>

<template>
  <div class="h-screen flex flex-col bg-[var(--bg-dark)] transition-colors duration-300">
    <!-- 聊天头部 -->
    <header
      class="px-6 py-4 bg-[var(--bg-card)] border-b border-[var(--border-color)] flex justify-between items-center">
      <h1 class="text-lg font-medium gradient-text">AI Chat</h1>
      <div class="flex gap-3">
        <!-- 主题切换按钮 -->
        <button class="icon-btn text-gray-400 hover:text-purple-400 transition-colors"
          :title="themeStore.isDark ? '切换到亮色模式' : '切换到暗色模式'" @click="themeStore.toggleTheme">
          <div :class="[
            'text-lg',
            themeStore.isDark ? 'i-carbon-moon' : 'i-carbon-sun'
          ]" />
        </button>
        <button class="icon-btn text-gray-400 hover:text-purple-400 transition-colors" title="清空消息"
          @click="chatStore.clearMessages">
          <div i-carbon-trash-can class="text-lg" />
        </button>
      </div>
    </header>

    <!-- 聊天消息区域 -->
    <div ref="messageContainer" class="flex-1 overflow-y-auto p-6 space-y-6 bg-[var(--bg-dark)]">
      <div v-for="message in chatStore.messages" :key="message.id" :class="[
        'flex',
        message.isUser ? 'justify-end' : 'justify-start'
      ]">
        <div :class="[
          'max-w-[70%] space-y-1',
          message.isUser ? 'items-end' : 'items-start'
        ]">
          <!-- 消息内容 -->
          <div :class="[
            'rounded-2xl px-4 py-2',
            message.type === 'text' || !message.type ? (
              message.isUser
                ? 'gradient-border bg-opacity-50'
                : 'bg-[var(--bg-card)] border border-[var(--border-color)]'
            ) : 'bg-transparent'
          ]">
            <!-- 文本消息 -->
            <template v-if="message.type === 'text' || !message.type">
              <div :class="[
                'break-words text-[15px]',
                message.isUser ? 'text-white' : 'text-[var(--text-primary)]'
              ]">
                <template v-if="message.isUser">
                  {{ message.content }}
                </template>
                <TypeWriter v-else :text="message.content" :key="message.id" :delay="40" />
              </div>
            </template>

            <!-- 图片消息 -->
            <template v-else-if="message.type === 'image'">
              <img :src="message.imageUrl" class="max-w-full rounded-lg border border-[var(--border-color)]" alt="图片消息">
            </template>
          </div>

          <!-- 消息时间 -->
          <div class="text-xs text-[var(--text-secondary)]">
            {{ formatTime(message.timestamp) }}
            <span v-if="message.status === 'error'" class="text-red-400 ml-1">
              发送失败
            </span>
          </div>
        </div>
      </div>
    </div>

    <!-- 输入区域 -->
    <div class="border-t border-[var(--border-color)] bg-[var(--bg-card)] p-4">
      <div class="max-w-4xl mx-auto flex gap-3 items-center">
        <!-- 图片上传按钮 -->
        <button
          class="p-2 text-[var(--text-secondary)] hover:text-purple-400 hover:bg-[var(--border-color)] rounded-xl transition-colors"
          title="上传图片" :disabled="chatStore.loading" @click="fileInput?.click()">
          <div i-carbon-image class="text-xl" />
        </button>
        <input ref="fileInput" type="file" accept="image/*" class="hidden" @change="handleImageUpload">

        <!-- 文本输入框 -->
        <input v-model="newMessage" type="text" placeholder="输入消息..."
          class="flex-1 px-4 py-2.5 bg-[var(--bg-dark)] border border-[var(--border-color)] rounded-xl text-[var(--text-primary)] placeholder:text-[var(--text-secondary)] focus:outline-none focus:border-purple-500 transition-all"
          :disabled="chatStore.loading" @keyup.enter="sendMessage">

        <!-- 发送按钮 -->
        <button
          class="send-btn px-6 py-2.5 rounded-xl hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
          :disabled="chatStore.loading" @click="sendMessage">
          <span v-if="chatStore.loading">发送中...</span>
          <span v-else>发送</span>
        </button>
      </div>
    </div>
  </div>
</template>