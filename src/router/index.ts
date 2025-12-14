import { createRouter, createWebHistory } from "vue-router"
import ChatPage from "@/pages/ChatPage.vue"

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      component: ChatPage,
      path: "/",
    },
  ],
})

export default router
