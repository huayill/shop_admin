// 引入vue
import Vue from 'vue'

// 引入路由
import VueRouter from 'vue-router'

// 导入子组件
import Login from '../components/login/login.vue'
import Home from '../components/home/home.vue'
import Users from '../components/users/users.vue'
import Rights from '../components/rights/rights.vue'
import Roles from '../components/roles/roles.vue'
import Categories from '../components/Categories/categories.vue'
// 使用use安装路由
Vue.use(VueRouter)

// 实例化路由
const router = new VueRouter({
  routes: [{
    path: '/',
    redirect: '/home'
  },
  {
    path: '/login',
    component: Login
  },
  {
    path: '/home',
    component: Home,
    children: [{
      path: '/users',
      component: Users
    },
    {
      path: '/roles',
      component: Roles
    },
    {
      path: '/rights',
      component: Rights
    },
    {
      path: '/categories',
      component: Categories
    }
    ]
  }
  ]
})

// 导航守卫
// to:访问哪个页面
// from: 从哪个页面过来的
// next :下一步(不管访问哪里都需要next)
router.beforeEach((to, from, next) => {
  //   console.log('to:', to.path)
  // 1.判断访问的是不是login页面
  if (to.path === '/login') {
    next()
  } else {
    //   访问的是其他页面
    //   2.判断是否登陆过
    const token = localStorage.getItem('token')
    if (token) {
      next()
    } else {
      //   没有登录过=>不允许访问其他页面=>访问login页面
      next('/login')
    }
  }
})
// 导出路由,和vue关联一起
export default router
