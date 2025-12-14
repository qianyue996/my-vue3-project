<template>
  <div><input type="text" v-model="messageInput" /></div>
  <div><button @click="sendMessage">发送</button></div>
</template>
<script lang="ts" setup>
import { ref } from "vue"

const api = "http://localhost:9902/v1/chat/completions"
const headers = {
  "Content-Type": "application/json",
  Authorization: "Bearer 123456",
}
const messageInput = ref<string>("")

async function sendMessage() {
  let accumulatedContent = ""
  const body = {
    model: "Qwen/Qwen3-30B-A3B",
    messages: [
      { role: "system", content: "You are a helpful assistant." },
      { role: "user", content: messageInput.value },
    ],
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
              return
            }

            try {
              const data = JSON.parse(jsonString)
              const content = data.choices?.[0]?.delta?.content || ""

              if (content) {
                accumulatedContent += content
                console.log(accumulatedContent)
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
  }
}
</script>
<style scoped></style>
