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
      if (!payload.limit) { payload.limit = 1000 }
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
      if (!payload.limit) { payload.limit = 1000 }
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
      commit('setRealtimeRef', db.collection('posts').doc(payload.id).onSnapshot(snapshot => {
        let post = snapshot.data()
        post.id = snapshot.id
        commit('setPost', post)
      }))
    },
    getPostsRealtime ({ commit }, payload = {}) {
      if (!payload.orderBy) { payload.orderBy = 'createdAt' }
      if (!payload.orderIn) { payload.orderIn = 'desc' }
      if (!payload.limit) { payload.limit = 1000 }
      let ref = {}
      if (payload.where) {
        ref = db.collection('posts').where(payload.where.value, '==', payload.where.equals).orderBy(payload.orderBy, payload.orderIn).limit(payload.limit)
      } else {
        ref = db.collection('posts').orderBy(payload.orderBy, payload.orderIn).limit(payload.limit)
      }
      commit('setRealtimeRef', ref.onSnapshot(snapshot => {
        let posts = []
        snapshot.forEach(doc => {
          let tmp = doc.data()
          tmp.id = doc.id
          posts.push(tmp)
        })
        commit('setPosts', posts)
      }))
    },
    addPost ({ commit }, payload) {
      db.collection('posts').add({ author: payload.author, createdAt: payload.createdAt, heading: payload.heading, message: payload.message, topics: payload.topics, promoted: payload.promoted }).then((re) => {
        payload.vm.$router.push(`/posts/${re.id}`)
      }
      )
    },
    editPost ({ commit }, payload) {
      let id = payload.id
      delete payload.id
      db.collection('posts').doc(id).update(payload)
    },
    deletePost ({ commit }, payload) {
      db.collection('posts').doc(payload.id).delete().then(
        commit('deletePost', payload.index)
      )
    },
    unsubRealtime ({ commit }, payload) {
      commit('unsubRealtimeRef', payload)
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
