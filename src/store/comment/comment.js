import { db } from '../../main.js'

export default {
  state: {
    comments: []
  },
  mutations: {
    setComments (state, payload) {
      state.comments = payload
    }
  },
  actions: {
    getComments ({ commit }, payload) {
      console.log('payload', payload)
      db
        .collection('comments')
        .where('post', '==', db.doc('posts/' + payload.postid))
        .get()
        .then(async (snapshot) => {
          Promise.all(
            snapshot.docs.map(async (doc) => {
              let tmp = doc.data()
              tmp.post = tmp.post.id
              tmp.author = tmp.author.id
              tmp.parent = tmp.parent ? tmp.parent.id : delete tmp.parent
              return tmp
            })
          ).then((comments) => {
            commit('setComments', comments)
          })
        })
    },
    addComment ({ commit }, payload) {
      db
        .collection('posts')
        .add({
          author: db.doc('post/' + payload.postid),
          createdAt: payload.createdAt,
          body: payload.body,
          topics: payload.topics
        })
        .then((re) => {
          payload.vm.$router.push(`/post/${re.id}`)
        })
    }
  },
  getters: {
    comments (state) {
      return state.comments
    }
  }
}
