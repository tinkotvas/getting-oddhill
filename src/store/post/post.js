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
      Promise.all(
        payload.map(async (post) => {
          post.author = await getAuthorData(post.author)
          return post
        })
      ).then((payload) => {
        state.posts = payload
      })
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
      db
        .collection('posts')
        .doc(payload.id)
        .get()
        .then(async (snapshot) => {
          let post = snapshot.data()
          post.author = await getAuthorData(post.author)
          commit('setPost', post)
          commit('setLastDoc', snapshot)
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
    },
    getPosts ({ commit }, payload = {}) {
      if (!payload.orderBy) {
        payload.orderBy = 'createdAt'
      }
      if (!payload.orderIn) {
        payload.orderIn = 'desc'
      }
      if (!payload.limit) {
        payload.limit = 10
      }
      db
        .collection('posts')
        .orderBy(payload.orderBy, payload.orderIn)
        .limit(payload.limit)
        .get()
        .then((snapshot) => {
          // let posts = []
          Promise.all(
            snapshot.docs.map(async (doc) => {
              let tmp = doc.data()
              tmp.id = doc.id
              // posts.push(tmp)
              tmp.author = await getAuthorData(tmp.author)
              return tmp
            })
          ).then((posts) => {
            commit('setPosts', posts)
            commit('setLastDoc', snapshot.docs.slice(-1)[0])
          })
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
    },
    getMorePosts ({ commit }, payload = {}) {
      if (!payload.orderBy) {
        payload.orderBy = 'createdAt'
      }
      if (!payload.orderIn) {
        payload.orderIn = 'desc'
      }
      if (!payload.limit) {
        payload.limit = 1000
      }
      db
        .collection('posts')
        .orderBy(payload.orderBy, payload.orderIn)
        .startAfter(this.getters.lastDoc)
        .limit(payload.limit)
        .get()
        .then((snapshot) => {
          if (snapshot.docs.length === 0) {
            return
          }
          let posts = this.getters.posts
          snapshot.forEach((doc) => {
            let tmp = doc.data()
            tmp.id = doc.id
            posts.push(tmp)
          })
          commit('setPosts', posts)
          commit('setLastDoc', snapshot.docs.slice(-1)[0])
        })
        .catch((err) => {
          console.log('Error getting documents', err)
        })
    },
    getPostRealtime ({ commit }, payload) {
      commit(
        'setRealtimeRef',
        db
          .collection('posts')
          .doc(payload.id)
          .onSnapshot(async (snapshot) => {
            let post = snapshot.data()
            post.id = snapshot.id
            post.author = await getAuthorData(post.author)
            commit('setPost', post)
          })
      )
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
    addPost ({ commit, state, rootState }, payload) {
      if (rootState.user.currentUser) {
        db
          .collection('posts')
          .add({
            author: db.doc('users/' + rootState.user.currentUser.id),
            createdAt: payload.createdAt,
            heading: payload.heading,
            message: payload.message,
            topics: payload.topics,
            promoted: payload.promoted
          })
          .then((re) => {
            payload.vm.$router.push(`/post/${re.id}`)
          })
      } else {
        console.log('Not logged in!')
      }
    },
    editPost ({ commit }, payload) {
      let id = payload.id
      delete payload.id
      db.collection('posts').doc(id).update(payload)
    },
    deletePost ({ commit }, payload) {
      db
        .collection('posts')
        .doc(payload.id)
        .delete()
        .then(commit('deletePost', payload.index))
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

async function getAuthorData (author) {
  return typeof author === 'object'
    ? 'firestore' in author
      ? (await author.get()).data()
      : author
    : { username: author }
}
