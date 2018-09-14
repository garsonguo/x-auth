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
      }]
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (about.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import(/* webpackChunkName: "about" */ './views/About.vue')
    }
  ]
})
