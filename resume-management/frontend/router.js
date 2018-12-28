import Vue from 'vue'
import Router from 'vue-router'
import Resume from 'containers/resume/Index'
import Upload from 'containers/upload/Index'

// import Products from 'containers/products/Index'
// import EditProducts from 'containers/products/EditProducts'
// import Shops from 'containers/shops/Index'
// import EditShops from 'containers/shops/EditShops'
// import Merchant from 'containers/merchant/Index' 
// import EditUserInfo from 'containers/merchant/EditUserInfo'
// import ShopProducts from 'containers/shops/ShopProducts'

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