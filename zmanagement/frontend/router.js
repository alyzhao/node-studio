import Vue from 'vue'
import Router from 'vue-router'
import Products from 'containers/products/Index.vue'
import EditProducts from 'containers/products/EditProducts'
import Shops from 'containers/shops/Index.vue'

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/products'
}, {
  name: 'products',
  path: '/products',
  component: Products,
  children: [{
    path: ':id',
    component: EditProducts,
    props: true
  }]
}, {
  name: 'shops',
  path: '/shops',
  component: Shops
}]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})