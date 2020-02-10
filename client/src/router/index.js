import Vue from 'vue'
import VueRouter from 'vue-router'
import index from '../components/Index'
import Register from '../components/Register'
import myTasks from '../components/ViewAllTasks'

Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'Login',
    component: index
  },
  {
    path: '/register',
    name: 'Register',
    component: Register
  },
  {
    path: '/myTasks',
    name: 'AllUserTasks',
    component: myTasks
    // meta: {
    //   requireAuth: true
    // }
  }
]

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes
})

export default router
