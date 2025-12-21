<template>
  <div class="flex items-center justify-between h-screen">
    <div class="bg-gray-400 w-1/5 h-full">
      <div class="h-[90%] overflow-y-auto">
        <div
          class="item border-gray-500 border-t cursor-pointer hover:bg-gray-300 p-2 bg-white"
          v-for="item in items"
          :key="item.id"
        >
          <a href="#"></a>
          <div class="flex justify-between items-center text-sm leading-5 text-gray-500">
            <span>{{ item.selectedModel }}</span>
            <span>{{ item.updatedAt }}</span>
          </div>
          <h2 class="font-semibold leading-6 text-gray-900 truncate">{{ item.title }}</h2>
        </div>
      </div>
      <div class="h-[10%] grid grid-cols-2 gap-2 p-2">
        <button
          class="inline-flex items-center justify-center bg-green-700 text-white hover:bg-green-700/90 h-full rounded-md"
        >
          1
        </button>
        <button
          class="inline-flex items-center justify-center bg-green-50 text-green-700 hover:bg-green-700/90 h-full] rounded-md"
        >
          1
        </button>
      </div>
    </div>
    <div class="bg-blue-400 flex-1 h-full">
      <div class="grid grid-rows-2 p-2 h-full">
        <div class="border inline-grid">1</div>
        <div class="border inline-grid">
          <input
            class="border border-t rounded-sm"
            type="text"
            v-model="messageInput"
            @keydown.enter="sendMessage"
          />
          <button class="border border-t rounded-sm" @click="sendMessage">发送</button>
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
import { nextTick, ref } from "vue"
import type { ConversationProps } from "../types"

const options = [
  {
    value: "Option1",
    label: "Option1",
  },
  {
    value: "Option2",
    label: "Option2",
  },
  {
    value: "Option3",
    label: "Option3",
  },
  {
    value: "Option4",
    label: "Option4",
  },
  {
    value: "Option5",
    label: "Option5",
  },
]

const items: ConversationProps[] = [
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title:
      "你好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title:
      "你好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title:
      "你好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好好",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
  {
    id: 1,
    title: "Chat1",
    selectedModel: "Qwen/Qwen3-30B-A3B",
    createdAt: "2023-05-01T12:00:00Z",
    updatedAt: "2023-05-01T12:00:00Z",
    providerId: "1",
  },
]

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
