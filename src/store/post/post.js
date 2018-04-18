import * as firebase from 'firebase'
import { db } from '../../main.js'

export default {
  state: {
    posts: {}
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    }
  },
  actions: {
    getPost ({ commit }, payload) {
      db.collection('posts').doc(payload.id).get()
        .then(snapshot => {
          commit('setPosts', snapshot.data())
        }).catch(err => {
          console.log('Error getting documents', err)
        })
    }
  },
  getters: {
    posts (state) {
      return state.posts
    }
  }
}
