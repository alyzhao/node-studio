import Vue from 'vue'
import App from './App.vue'
import router from './router'
import Login from './Login.vue'
import "babel-polyfill"
import 'normalize.css'
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
  
Vue.use(ElementUI, { size: 'small' })

if (document.getElementsByTagName('meta')['user-identification'].getAttribute('content') === 'management') {
  new Vue({
    el: '#app',
    template: '<App/>',
    router,
    components: { App }
  })  
} else {
  new Vue({
    el: '#login',
    template: '<login />',
    components: { Login }
  })
}
