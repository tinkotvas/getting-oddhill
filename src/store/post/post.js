import * as firebase from 'firebase'
import { db } from '../../main.js'

export default {
  state: {
    posts: [],
    post: {},
    realtimeRef: {},
    lastDoc: {}
  },
  mutations: {
    setPosts (state, payload) {
      state.posts = payload
    },
    setPost (state, payload) {
      state.post = payload
    },
    setLastDoc (state, payload) {
      state.lastDoc = payload
    },
    deletePost (state, index) {
      state.posts.splice(index, 1)
    },
    setRealtimeRef (state, payload) {
      state.realtimeRef = payload
      state.realtimeRef.onSnapshot(snapshot => {
        // IF we're getting multiple posts
        if (snapshot.docs) {
          let posts = []
          snapshot.forEach(doc => {
            let tmp = doc.data()
            tmp.id = doc.id
            posts.push(tmp)
          })
          state.posts = posts
        } else {
          let post = snapshot.data()
          post.id = snapshot.id
          state.post = post
        }
      })
    },
    unsubRealtimeRef (state, payload) {
      state.realtimeRef()
    }
  },
  actions: {
    getPost ({ commit }, payload) {
      db.collection('posts').doc(payload.id).get()
        .then(snapshot => {
          commit('setPost', snapshot.data())
          commit('setLastDoc', snapshot.doc)
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
          commit('setLastDoc', snapshot.docs.slice(-1)[0])
        }).catch(err => {
          console.log('Error getting documents', err)
        })
    },
    getMorePosts ({ commit }, payload = {}) {
      if (!payload.orderBy) { payload.orderBy = 'createdAt' }
      if (!payload.orderIn) { payload.orderIn = 'desc' }
      if (!payload.limit) { payload.limit = 10 }
      db.collection('posts').orderBy(payload.orderBy, payload.orderIn).startAfter(this.getters.lastDoc).limit(payload.limit).get()
        .then(snapshot => {
          if (snapshot.docs.length === 0) { return }
          let posts = this.getters.posts
          snapshot.forEach(doc => {
            let tmp = doc.data()
            tmp.id = doc.id
            posts.push(tmp)
          })
          commit('setPosts', posts)
          commit('setLastDoc', snapshot.docs.slice(-1)[0])
        }).catch(err => {
          console.log('Error getting documents', err)
        })
    },
    getPostRealtime ({ commit }, payload) {
      commit('setRealtimeRef', db.collection('posts').doc(payload.id))
    },
    getPostsRealtime ({ commit }, payload = {}) {
      if (!payload.orderBy) { payload.orderBy = 'createdAt' }
      if (!payload.orderIn) { payload.orderIn = 'desc' }
      if (!payload.limit) { payload.limit = 10 }

      commit('setRealtimeRef', db.collection('posts').orderBy(payload.orderBy, payload.orderIn).limit(payload.limit))
    },
    deletePost ({ commit }, payload) {
      db.collection('posts').doc(payload.id).delete().then(
        commit('deletePost', payload.index)
      )
    }
  },
  getters: {
    posts (state) {
      return state.posts
    },
    post (state) {
      return state.post
    },
    lastDoc (state) {
      return state.lastDoc
    }
  }
}
