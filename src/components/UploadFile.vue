<template>
  <div class="upload-container">
    <input type="file" @change="handleFileChange" />
    <button @click="uploadFile">提交文件</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from "vue"
import axios from "axios"
const api = "http://localhost:3000/upload"
const selectFile = ref<File | null>(null)

async function handleFileChange(event: Event) {
  const inputElement = event.target as HTMLInputElement
  selectFile.value = inputElement.files?.[0] || null
}

async function uploadFile() {
  if (!selectFile.value) {
    alert("请选择文件")
    return
  }

  try {
    const formData = new FormData()
    formData.append("file", selectFile.value)

    const response = await axios.post(api, selectFile.value)

    console.log("服务器返回:", response.data)
    alert("上传成功")
  } catch (error) {
    console.log(error)
  }
}
</script>
<style scoped></style>
