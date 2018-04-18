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
    },
    getPosts ({ commit }, payload = {}) {
      if (!payload.orderBy) { payload.orderBy = 'createdAt' }
      if (!payload.orderIn) { payload.orderIn = 'desc' }
      if (!payload.limit) { payload.limit = 10 }
      db.collection('posts').orderBy(payload.orderBy, payload.orderIn).limit(payload.limit).get()
        .then(snapshot => {
          let posts = []
          snapshot.forEach(doc => {
            let tmp = doc.data()
            tmp.id = doc.id
            posts.push(tmp)
          })
          commit('setPosts', posts)
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
