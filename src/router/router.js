import Vue from 'vue'
import Router from 'vue-router'
import Layout from '../views/layout/Layout.vue'
import iView from 'iview'
import { getToken } from '../libs/auth.js'

Vue.use(Router)

const router = new Router({
  routes: [
    {
      path: '/',
      name: 'Login',
      component: () => import('../views/login/Login.vue'),
    },
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
      }]
    }
  ]
})


// 路由守卫
router.beforeEach((to, from, next) => {
  iView.LoadingBar.start()
  const token = getToken()
  if(!token && to.name === 'Login'){
    // 未登录且要跳转的页面是登录页
    next()
  }else if(!token && to.name !== 'Login'){
    // 未登录且要跳转的页面不是登录页
    next({
      name:'Login'
    })
  }else if(token && to.name === 'Login'){
    // 未登录且要跳转的页面不是登录页
    next({
      name:'Home'
    })
  }else{
    next()
  }
})


router.afterEach(()=>{
  iView.LoadingBar.finish()
  window.scrollTo(0, 0)
})

export default router