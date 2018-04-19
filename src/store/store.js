import Vuex from 'vuex'
import user from './user/user'
import post from './post/post'
import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  modules: {
    user: user,
    post: post
  }
})

export default store
