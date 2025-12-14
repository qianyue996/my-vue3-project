<template>
  <div><input type="text" v-model="messageInput" /></div>
  <div><button @click="sendMessage">发送</button></div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'

const api = '/steins/alg/common/chat'
const messageInput = ref<string>('')
const sendMessage = () => {
  console.log('开始聊天')
  fetch(api, {
    method: 'POST',
    headers: {
      Accept: 'text/event-stream',
    },
    body: messageInput.value,
  }).then((response) => {
    if (response.status === 200) {
      console.log('开始接收数据')
    }
  })
}
</script>
<style scoped></style>
