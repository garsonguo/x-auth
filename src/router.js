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
        path: '/Home',
        name: 'Home',
        component: () => import('./views/home/Home.vue')
      },{
        path:'About',
        name:'About',
        children: [{
          path: '/About/About1',
          name: 'About1',
          component: () => import('./views/About1.vue')
        },{
          path: '/About/About2',
          name: 'About2',
          component: () => import('./views/About2.vue')
        }]
      }]
    }
  ]
})
