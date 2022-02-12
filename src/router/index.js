import Vue from 'vue'
import VueRouter from 'vue-router'
import HomePage from '../components/Pages/HomePage.vue'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Photos',
    component: HomePage
  },
  {
    path: '/explore',
    name: 'Explore',
    // route level code-splitting
    // this generates a separate chunk (explore.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "explore" */ '../components/Pages/Explore.vue')
  },
  {
    path: '/trash',
    name: 'Trash',
    // route level code-splitting
    // this generates a separate chunk (trash.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "trash" */ '../components/Pages/Trash.vue')
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
