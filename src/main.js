import Vue from 'vue'
import App from './App.vue'
import router from './router/router.js'
import store from './store/index.js'
import iView from 'iview' // 导入iview
// import BaiduMap from 'vue-baidu-map' // 导入百度地图
import 'iview/dist/styles/iview.css' // iview皮肤
import './assets/less/common.less'

Vue.config.productionTip = false

Vue.use(iView)
// Vue.use(BaiduMap, {
//   /* Visit http://lbsyun.baidu.com/apiconsole/key for details about app key. */
//   ak: '0H3hj15e73s2GwKS7iXa3Ws0jYY4Ad7P'
// })

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')