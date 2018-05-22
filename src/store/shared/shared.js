// import * as firebase from 'firebase'
// import { db } from '../../main.js'

export default {
  state: {
    postsView: 'post-view-a',
    theme: 'light'
  },
  mutations: {
    setPostsView (state, payload) {
      state.postsView = payload
    },
    switchTheme (state, payload) {
      state.theme = payload ? payload : state.theme === 'light' ? 'dark' : 'light'
    }
  },
  actions: {
    savePostsView ({commit}, payload) {
      commit('setPostsView', payload)
    }
  },
  getters: {
    postsView (state) {
      return state.postsView
    }
  }
}
