import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'
import Articles from '@/views/articles'
import Home from '@/views/home'
import Pictures from '@/views/pictures'
import Page404 from '@/views/page404'
import { getUser } from '@/utils/storage'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      path: '/',
      component: Layout,
      children: [
        { path: '', component: Home },
        { path: '/articles', component: Articles },
        { path: '/pictures', component: Pictures }
      ]
    },
    { path: '/login', component: Login },
    { path: '*', component: Page404 }
  ]
})
// 添加全局前置守卫
router.beforeEach((to, from, next) => {
  const token = getUser().token
  if (to.path === '/login' || token) {
    next()
  } else {
    next('/login')
  }
})
export default router
