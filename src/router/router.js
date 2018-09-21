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
      meta:{
        title:'登录'
      }
    },
    {
      path: '/',
      name: 'Layout',
      component: Layout,
      redirect: 'Home',
      meta: {
        title: '首页'
      },
      children: [{
        path: '/Home',
        name: 'Home',
        component: () => import('../views/home/Home.vue'),
        meta:{
          title:'首页'
        }
      }]
    },
    {
      path:'/SystemSet',
      name:'SystemSet',
      component: Layout,
      meta:{
        title: '系统设置'
      },
      children: [{
        path: 'MenuManage',
        name: 'MenuManage',
        component: () => import('../views/systemSet/MenuManage.vue'),
        meta: {
          title: '菜单管理'
        }
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