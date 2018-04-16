// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'mdi/css/materialdesignicons.css'

// import base app vue component
import App from './App'

// and then the differente page-comopnents
import HomePage from './components/pages/HomePage'
import PostsPage from './components/pages/PostsPage'
import PostsAddPage from './components/pages/PostsAddPage'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/firestore'

Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(VueFire)

firebase.initializeApp({
  projectId: 'getting-oddhill',
  databaseURL: 'https://getting-oddhill.firebaseio.com'
})

export const db = firebase.firestore()

Vue.config.productionTip = false

let routes = [
  { path: '/', component: HomePage },
  { path: '/posts', component: PostsPage },
  { path: '/posts/add', component: PostsAddPage }
]

/* eslint-disable no-new */
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history',
  linkExactActiveClass: 'is-active'
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
}).$mount('#app')
