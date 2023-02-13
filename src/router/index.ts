import Vue from 'vue'
import VueRouter, { RouteConfig } from 'vue-router'

Vue.use(VueRouter)

const routes: Array<RouteConfig> = [
  {
    path: '/',
    name: 'TaskList',
    component: () => import(/* webpackChunkName: "list" */ '@/views/TaskList.vue')
  },
  {
    path: '/TaskItem/:id',
    name: 'TaskItem',
    component: () => import(/* webpackChunkName: "item" */ '@/views/TaskItem.vue')
  },
  {
    path: '**',
    component: () => import(/* webpackChunkName: "notfound" */ '@/views/NotFound.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
