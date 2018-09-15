import Vue from 'vue'
import Router from 'vue-router'
import Layout from './views/layout/Layout.vue'
// import Home from './views/home/Home.vue'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: 'Home',
      children: [{
        path: 'Home',
        name: 'Home',
        component: () => import('./views/home/Home.vue')
      },{
        path:'About',
        name:'About',
        component: () => import('./views/About.vue')
      }]
    }
  ]
})
