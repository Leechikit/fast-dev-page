/*
 * @Description:
 * @Autor: Lizijie
 * @Date: 2020-03-24 15:42:47
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-11-30 18:19:05
 */
import Vue from 'vue'
import VueRouter from 'vue-router'
import store from '@/store'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    redirect: {
      name: 'page-design-gridstack'
    }
  },
  {
    path: '/page-design',
    name: 'page-design',
    component: () => import('@/views/page-design/index.vue')
  },
  {
    path: '/page-design-gridstack',
    name: 'page-design-gridstack',
    component: () => import('@/views/page-design-gridstack/index.vue')
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
  },
  {
    path: '/test',
    name: 'test',
    component: () => import('@/views/test')
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
