import Vuex from 'vuex'
import user from './user/user'

const store = new Vuex.Store({
  modules: {
    user: user
  }
})

export default store
