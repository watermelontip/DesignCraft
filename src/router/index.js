import { createRouter, createWebHashHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  },
  {
    path: '/studio',
    name: 'Studio',
    component: () => import('../views/Studio.vue')
  },
  {
    path: '/design-system',
    name: 'DesignSystem',
    component: () => import('../views/DesignSystem.vue')
  },
  {
    path: '/plugins',
    name: 'Plugins',
    component: () => import('../views/Plugins.vue')
  },
  {
    path: '/automation',
    name: 'Automation',
    component: () => import('../views/Automation.vue')
  },
  {
    path: '/settings',
    name: 'Settings',
    component: () => import('../views/Settings.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
