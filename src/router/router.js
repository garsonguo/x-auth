import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout.vue'

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
        component: () => import('../views/home/Home.vue')
      }]
    },
    {
      path:'/About',
      name:'About',
      component: Layout,
      redirect: 'noredirect',
      children: [{
        path: 'About1',
        name: 'About1',
        component: () => import('../views/About1.vue')
      },{
        path: 'About2',
        name: 'About2',
        component: () => import('../views/About2.vue')
      },{
        path: 'About3',
        name: 'About3',
        component: () => import('../views/About3.vue')
      },{
        path: 'About4',
        name: 'About4',
        component: () => import('../views/About4.vue')
      },{
        path: 'About5',
        name: 'About5',
        component: () => import('../views/About5.vue')
      },{
        path: 'About6',
        name: 'About6',
        component: () => import('../views/About6.vue')
      }]
    }
  ]
})
