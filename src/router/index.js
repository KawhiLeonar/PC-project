import Vue from 'vue'
import VueRouter from 'vue-router'
import Login from '@/views/login'
import Layout from '@/views/layout'

Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    { path: '/', component: Layout, children: [] },
    { path: '/login', component: Login }
  ]
})

export default router
