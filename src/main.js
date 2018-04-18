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
import StoragePage from './components/pages/StoragePage'
import PostPage from './components/pages/PostPage'
import ProfilePage from './components/pages/ProfilePage'
import ProfilesPage from './components/pages/ProfilesPage'

import VueFire from 'vuefire'
import firebase from 'firebase/app'
import 'firebase/storage'
import 'firebase/firestore'

Vue.use(Buefy)
Vue.use(VueRouter)
Vue.use(VueFire)

firebase.initializeApp({
  apiKey: 'AIzaSyBU9mexyTAMLNCuRDRGpWk-OHLplQWHqf8',
  authDomain: 'getting-oddhill.firebaseapp.com',
  databaseURL: 'https://getting-oddhill.firebaseio.com',
  projectId: 'getting-oddhill',
  storageBucket: 'getting-oddhill.appspot.com',
  storage: 'getting-oddhill.appspot.com',
  messagingSenderId: '116989958771'
})

export const db = firebase.firestore()
export const storage = firebase.storage()

Vue.config.productionTip = false

export const routes = [
  { path: '/', component: HomePage },
  { path: '/posts', component: PostsPage },
  { path: '/posts/add', component: PostsAddPage },
  { path: '/posts/:id', component: PostPage },
  { path: '/profile', component: ProfilePage },
  { path: '/profiles', component: ProfilesPage },
  { path: '/storage', component: StoragePage }
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
