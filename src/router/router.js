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
    },
    {
      path:'/AuthManage',
      name:'AuthManage',
      component: Layout,
      meta:{
        title: '权限管理'
      },
      children: [{
        path: 'Function',
        name: 'Function',
        component: () => import('../views/authManage/function/Function.vue'),
        meta: {
          title: '功能管理'
        }
      },{
        path: 'Role',
        name: 'Role',
        component: () => import('../views/authManage/role/Role.vue'),
        meta: {
          title: '角色管理'
        }
      },{
        path: 'RoleAuth',
        name: 'RoleAuth',
        component: () => import('../views/authManage/roleAuth/RoleAuth.vue'),
        meta: {
          title: '角色权限管理'
        }
      },{
        path: 'RoleUser',
        name: 'RoleUser',
        component: () => import('../views/authManage/roleUser/RoleUser.vue'),
        meta: {
          title: '角色用户管理'
        }
      },{
        path: 'UserRole',
        name: 'UserRole',
        component: () => import('../views/authManage/userRole/UserRole.vue'),
        meta: {
          title: '用户角色管理'
        }
      }]
    },
    {
      path:'/OrgStructure',
      name:'OrgStructure',
      component: Layout,
      meta:{
        title: '组织构架'
      },
      children: [{
        path: 'DepManage',
        name: 'DepManage',
        component: () => import('../views/orgStructure/depManage/DepManage.vue'),
        meta: {
          title: '部门管理'
        }
      },
      {
        path: 'PosManage',
        name: 'PosManage',
        component: () => import('../views/orgStructure/posManage/PosManage.vue'),
        meta: {
          title: '职位管理'
        }
      }]
    },
    {
      path:'/UserManage',
      name:'UserManage',
      component: Layout,
      meta:{
        title: '用户管理'
      },
      children: [{
        path: 'UserManage',
        name: 'UserManage',
        component: () => import('../views/userManage/UserManage.vue'),
        meta: {
          title: '用户管理'
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