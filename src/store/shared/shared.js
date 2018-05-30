// import * as firebase from 'firebase'
// import { db } from '../../main.js'

export default {
  state: {
    postsView: 'post-view-c'
  },
  mutations: {
    setPostsView (state, payload) {
      state.postsView = payload
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
