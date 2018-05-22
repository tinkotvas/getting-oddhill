import Vuex from 'vuex'
import user from './user/user'
import post from './post/post'
import shared from './shared/shared'
import storage from './storage/storage'
import comment from './comment/comment'

import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  modules: {
    user,
    post,
    shared,
    storage,
    comment
  }
})

export default store
