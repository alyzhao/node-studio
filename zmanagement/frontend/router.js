import Vue from 'vue'
import Router from 'vue-router'
import Products from 'containers/products/Index'
import EditProducts from 'containers/products/EditProducts'
import Shops from 'containers/shops/Index'
import EditShops from 'containers/shops/EditShops'
import Merchant from 'containers/merchant/Index' 

Vue.use(Router)

const routes = [{
  path: '/',
  redirect: '/index'
}, {
  path: '/index',
  component: Merchant
}, {
  name: 'products',
  path: '/products',
  component: Products,
  children: [{
    name: 'editProducts',
    path: 'edit/:id',
    component: EditProducts,
    props: true
  }, {
    name: 'addProducts',
    path: 'add',
    component: EditProducts
  }]
}, {
  name: 'shops',
  path: '/shops',
  component: Shops,
  children: [{
    name: 'editShop',
    path: 'edit/:id',
    component: EditShops,
    props: true
  }, {
    name: 'addShop',
    path: 'add',
    component: EditShops
  }]
}]

export default new Router({
  mode: 'history',
  routes,
  linkActiveClass: 'is-active'
})