// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import Vuetify from 'vuetify'
import App from './App'

Vue.use(Vuetify)

require('https://fonts.googleapis.com/css?family=Roboto:300,400,500,700|Material+Icons')
require('../node_modules/vuetify/dist/vuetify.min.css')
require('../node_modules/bootstrap/scss/bootstrap.scss')

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  components: { App },
  template: '<App/>'
})
