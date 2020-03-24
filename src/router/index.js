import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'page-design'
    }
  },
  {
    path: '/page-design',
    name: 'page-design',
    component: () => import('@/views/page-design/index.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
