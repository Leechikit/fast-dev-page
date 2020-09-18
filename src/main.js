/*
 * @Description:
 * @Autor: Lizijie
 * @Date: 2020-03-24 15:42:47
 * @LastEditors: Lizijie
 * @LastEditTime: 2020-09-18 10:54:41
 */
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'
import '@/assets/icon'
import '@/assets/theme/style.scss'
import 'element-ui/lib/theme-chalk/index.css'
import FdIcon from '@/components/basic/FdIcon'

Vue.config.productionTip = false

Vue.use(ElementUi, { size: 'small' })
Vue.component('FdIcon', FdIcon)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
