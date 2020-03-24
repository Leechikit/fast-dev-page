import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUi from 'element-ui'

Vue.config.productionTip = false

Vue.use(ElementUi, { size: 'small' })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
