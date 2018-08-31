import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

import Index from 'containers/index/Index'

const routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  components: Index
}]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})