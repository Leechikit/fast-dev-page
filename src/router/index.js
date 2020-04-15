import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'flow-design'
    }
  },
  {
    path: '/page-design',
    name: 'page-design',
    component: () => import('@/views/page-design/index.vue')
  },
  {
    path: '/flow-design-g6',
    name: 'flow-design-g6',
    component: () => import('@/views/flow-design-g6/index.vue')
  },
  {
    path: '/flow-design',
    name: 'flow-design',
    component: () => import('@/views/flow-design/index.vue')
  }
]

const router = new VueRouter({
  routes
})

router.beforeEach((to, from, next) => {
  store.commit('updatePageType', to.query.pageType || 'PAGE')
  next()
})

export default router
