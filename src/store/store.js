import Vuex from 'vuex'
import user from './user/user'
import post from './post/post'
import shared from './shared/shared'
import storage from './storage/storage'
import profile from './profile/profile'

import Vue from 'vue'

Vue.use(Vuex)

const store = new Vuex.Store({
  strict: false,
  modules: {
    user: user,
    post: post,
    shared: shared,
    storage: storage,
    profile: profile
  }
})

export default store
