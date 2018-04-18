import Vuex from 'vuex'
import user from './user/user'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user
  }
})

export default store
