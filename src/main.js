// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'

// import base app vue component
import App from './App'

// and then the differente page-comopnents
import Home from './Home'
import Posts from './Posts'

Vue.use(Buefy)
Vue.use(VueRouter)

Vue.config.productionTip = false

let routes = [
  { path: '/', component: Home },
  { path: '/posts', component: Posts }
]

/* eslint-disable no-new */
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

new Vue({
  el: '#app',
  template: '<App/>',
  components: { App },
  router
}).$mount('#app')
