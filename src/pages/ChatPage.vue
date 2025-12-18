<template>
  <div class="chat-container">
    <div class="chat-box" v-for="(message, index) in messageList" :key="index">{{ message }}</div>
    <div class="chat-box" v-if="isTyping">{{ currentResponse }}</div>
  </div>
  <div><input type="text" v-model="messageInput" @keydown.enter="sendMessage" /></div>
  <div><button @click="sendMessage">发送</button></div>
  <UploadFile />
</template>
<script lang="ts" setup>
import { nextTick, ref } from "vue"
import UploadFile from "@/components/UploadFile.vue"

const api = "http://localhost:9902/v1/chat/completions"
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer 123456",
}
const messageInput = ref<string>("")
const messageList = ref<Message[]>([])
const isLoading = ref<boolean>(false)
const isTyping = ref<boolean>(false)
const currentResponse = ref<string>("")

interface Message {
  role: "user" | "assistant"
  content: string
}

async function sendMessage() {
  if (isLoading.value) return

  const userMessage = messageInput.value
  if (!userMessage.trim()) return

  messageList.value.push(buildMessage("user", userMessage))

  messageInput.value = ""

  isLoading.value = true
  isTyping.value = true
  currentResponse.value = ""

  let accumulatedContent = ""
  const body = {
    model: "Qwen/Qwen3-30B-A3B",
    messages: messageList.value,
    stream: true,
  }

  try {
    const response = await fetch(api, {
      method: "POST",
      headers: headers,
      body: JSON.stringify(body),
    })

    if (response.status === 200 && response.body) {
      const reader = response.body.getReader()
      const decoder = new TextDecoder("utf-8")

      while (true) {
        const { done, value } = await reader.read()
        if (done) {
          break
        }
        const chunk = decoder.decode(value)
        const lines = chunk.split("\n")

        for (const line of lines) {
          const trimmedLine = line.trim()

          if (trimmedLine.startsWith("data:")) {
            const jsonString = trimmedLine.substring(5).trim()

            if (jsonString === "[DONE]") {
              reader.cancel()
              messageList.value.push(buildMessage("assistant", accumulatedContent))
            }

            try {
              const data = JSON.parse(jsonString)
              const content = data.choices?.[0]?.delta?.content || ""

              if (content) {
                accumulatedContent += content
                currentResponse.value = accumulatedContent
                await nextTick()
                scrollToBottom()
              }
            } catch (error) {
              console.error(error)
            }
          }
        }
      }
    } else {
      console.error(response)
    }
  } catch (error) {
    console.error(error)
  } finally {
    isLoading.value = false
    isTyping.value = false
    currentResponse.value = ""
  }
}

function scrollToBottom() {
  const container = document.querySelector(".chat-container")
  if (container) {
    container.scrollTop = container.scrollHeight
  }
}

function buildMessage(role: "user" | "assistant", message: string): Message {
  return { role: role, content: message }
}
</script>
<style scoped>
.chat-container {
  height: 400px;
  overflow-y: auto;
  border: 1px solid #ccc;
  margin-bottom: 10px;
  padding: 10px;
}

.chat-box {
  margin-bottom: 10px;
  padding: 8px;
  background-color: #f5f5f5;
  border-radius: 4px;
}
</style>
