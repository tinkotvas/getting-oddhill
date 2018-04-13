// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueRouter from 'vue-router'
import Buefy from 'buefy'
import 'buefy/lib/buefy.css'
import 'mdi/css/materialdesignicons.css'

// import base app vue component
import App from './App'

// and then the differente page-comopnents
import Home from './Home'
import Posts from './Posts'
import AddPost from './AddPost'

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
  { path: '/', component: Home },
  { path: '/posts', component: Posts },
  { path: '/posts/add', component: AddPost }
]

/* eslint-disable no-new */
const router = new VueRouter({
  routes, // short for routes: routes
  mode: 'history'
})

new Vue({
  el: '#app',
  components: { App },
  template: '<App/>',
  router
}).$mount('#app')
