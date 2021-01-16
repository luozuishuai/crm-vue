import Vue from 'vue'
import VueRouter from 'vue-router'
// import Home from '../views/Home.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/login',
    name: 'login',
    component: () => import('../views/login/index.vue')
  },
  {
    path:'/',
    redirect:'/main'
  },
  {
    path: '/main',
    name: 'main',
    component: () => import('../views/main/index.vue'),
    children:[
      {
        path:"index",
        name:"index",
        component: () => import("../views/index/index.vue")
      },
      {
        path:"supplier",
        name:"supplier",
        component: () => import("../views/supplier/index.vue")
      }
    ]
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
