import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index.js'
import iView from 'iview' // 导入iview
import 'iview/dist/styles/iview.css' // iview皮肤
import './assets/less/common.less'

Vue.config.productionTip = false

Vue.use(iView)

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')