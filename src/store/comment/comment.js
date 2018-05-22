import { db } from '../../main.js'

export default {
  state: {
    comments: []
  },
  mutations: {
    setComments (state, payload) {
      state.comments = payload
    },
    addComment (state, payload) {
      state.comments.unshift(payload)
    }
  },
  actions: {
    getComments ({ commit }, payload) {
      console.log('payload', payload)
      db
        .collection('comments')
        .where('post', '==', db.doc('posts/' + payload.postid))
        .orderBy('createdAt', 'desc')
        .get()
        .then(async snapshot => {
          Promise.all(
            snapshot.docs.map(async doc => {
              let tmp = doc.data()
              tmp.post = tmp.post.id
              tmp.author = tmp.author.id
              tmp.parent = tmp.parent ? tmp.parent.id : delete tmp.parent
              return tmp
            })
          ).then(comments => {
            commit('setComments', comments)
          })
        })
    },
    addComment ({ commit, rootState }, payload) {
      db
        .collection('comments')
        .add({
          author: db.doc('profiles/' + rootState.user.currentUser.id),
          createdAt: payload.createdAt,
          body: payload.body,
          parent: payload.parent
            ? db.doc('comments/' + payload.parentId)
            : null,
          post: db.doc('posts/' + payload.postid)
        })
        .then(re => {
          re.get().then(doc =>{
            let tmp = doc.data()
            tmp.post = tmp.post.id
            tmp.author = tmp.author.id
            tmp.parent = tmp.parent ? tmp.parent.id : delete tmp.parent
            commit('addComment', tmp)
          })
        })
    }
  },
  getters: {
    comments (state) {
      return state.comments
    }
  }
}
