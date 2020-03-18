import Vue from 'vue'
import VueRouter from 'vue-router'
import Start from '../views/Start.vue'
import Home from '../views/Home.vue'
import Old from '../views/Old.vue'
import Gospel from '../views/Gospel.vue'
import Acts from '../views/Acts.vue'
import Revelation from '../views/Revelation.vue'
import Page from '../views/Page.vue'


Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    name: 'start',
    component: Start
  },
  {
    path: '/home',
    name: 'home',
    component: Home
  },
  {
    path: '/old',
    name: 'old',
    component: Old
  },
  {
    path: '/gospel',
    name: 'gospel',
    component: Gospel
  },
  {
    path: '/acts',
    name: 'acts',
    component: Acts
  },
  {
    path: '/revelation',
    name: 'revelation',
    component: Revelation
  },
  {
    path: '/page',
    component: Page
  },
  {
    path: '/page/:book',
    component: Page
  },
  {
    path: '/page/:book/:chapter',
    component: Page
  },
  {
    path: '/page/:book/:chapter/:verse',
    component: Page
  },
]

const router = new VueRouter({
  mode: 'hash',
  routes
})

export default router
