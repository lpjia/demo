import { defineStore } from 'pinia'
import { ref, computed } from 'vue'

export interface ChatMessage {
  id: number
  content: string
  isUser: boolean
  timestamp: Date
  status?: 'sending' | 'sent' | 'error'
  type?: 'text' | 'image'
  imageUrl?: string
}

export const useChatStore = defineStore('chat', () => {
  const messages = ref<ChatMessage[]>([])
  const loading = ref(false)

  // 从 localStorage 加载消息历史
  const loadMessages = () => {
    const savedMessages = localStorage.getItem('chat-messages')
    if (savedMessages) {
      messages.value = JSON.parse(savedMessages).map((msg: any) => ({
        ...msg,
        timestamp: new Date(msg.timestamp)
      }))
    }
  }

  // 保存消息到 localStorage
  const saveMessages = () => {
    localStorage.setItem('chat-messages', JSON.stringify(messages.value))
  }

  // 添加消息
  function addMessage(message: Omit<ChatMessage, 'id' | 'timestamp' | 'status'>) {
    const newMessage: ChatMessage = {
      id: Date.now(),
      timestamp: new Date(),
      status: 'sent',
      type: 'text',
      ...message,
    }
    messages.value.push(newMessage)
    saveMessages()
    return newMessage
  }

  // 清空消息
  function clearMessages() {
    messages.value = []
    saveMessages()
  }

  // 发送消息
  async function sendMessage(content: string) {
    if (!content.trim()) return

    // 添加用户消息
    const userMessage = addMessage({
      content,
      isUser: true,
    })

    // 模拟API请求
    loading.value = true
    try {
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 模拟自动回复
      const responses = [
        '我明白你的意思了',
        '这是一个很有趣的观点',
        '让我想想...',
        '确实如此',
        '你说得对',
        '这个问题很有意思'
      ]
      const randomResponse = responses[Math.floor(Math.random() * responses.length)]

      const aiMessage = addMessage({
        content: randomResponse,
        isUser: false,
      })

      return userMessage // 返回用户消息，方便跟踪
    } catch (error) {
      userMessage.status = 'error'
      saveMessages()
      return null
    } finally {
      loading.value = false
    }
  }

  // 上传图片
  async function uploadImage(file: File) {
    if (!file.type.startsWith('image/')) {
      throw new Error('只能上传图片文件')
    }

    loading.value = true
    try {
      // 模拟上传延迟
      await new Promise(resolve => setTimeout(resolve, 1000))

      // 创建本地预览URL
      const reader = new FileReader()
      const imageUrl = await new Promise<string>((resolve) => {
        reader.onload = (e) => resolve(e.target?.result as string)
        reader.readAsDataURL(file)
      })

      addMessage({
        content: '发送了一张图片',
        isUser: true,
        type: 'image',
        imageUrl
      })

      // 模拟回复
      await new Promise(resolve => setTimeout(resolve, 500))
      addMessage({
        content: '我收到你的图片了！',
        isUser: false,
      })
    } finally {
      loading.value = false
    }
  }

  // 初始化加载消息
  loadMessages()

  return {
    messages,
    loading,
    addMessage,
    clearMessages,
    sendMessage,
    uploadImage,
  }
}) 