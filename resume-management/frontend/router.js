import Vue from 'vue'
import Router from 'vue-router'
import Resume from 'containers/resume/Index'
import Upload from 'containers/upload/Index'

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/resume',
  component: Resume,
}, {
  path: '/index',
  component: Upload
}]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})