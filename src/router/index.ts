import { createRouter, createWebHistory } from 'vue-router'
import Home from '@/pages/Home.vue'
import CookingChecklist from '@/pages/CookingChecklist.vue'
import NotFound from '@/pages/NotFound.vue'

const router = createRouter({
  history: createWebHistory(),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: Home,
    },
    {
      path: '/cooking',
      name: 'CookingChecklist',
      component: CookingChecklist,
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: NotFound,
    },
  ],
})

export default router
