import * as firebase from 'firebase'
import { db, iframeRegex } from '../../main.js'
import * as removeMd from 'remove-markdown'

export default {
  state: {
    posts: [],
    post: {},
    realtimeRef: {},
    lastDoc: {},
    topics: []
  },
  mutations: {
    setTopics (state, payload) {
      state.topics = payload
    },
    setPosts (state, payload) {
      state.posts = payload
    },
    setPost (state, payload) {
      state.post = payload
    },
    editPost (state, payload) {
      Object.assign(state.post, payload)
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
    getTopics ({ commit }, payload) {
      db
        .collection('posts')
        .get()
        .then(async snapshot => {
          let allTopics = []
          snapshot.forEach(post => {
            let topics = post.data().topics
            let topicKeys = topics ? Object.keys(topics) : undefined
            if (Array.isArray(topicKeys)) {
              topicKeys.forEach(topic => {
                let existingTopic = allTopics.find(t => {
                  return topic === t.topic
                })
                if (existingTopic) {
                  existingTopic.count += 1
                } else {
                  allTopics.push({
                    topic: topic,
                    count: 1
                  })
                }
              })
            }
          })
          commit('setTopics', allTopics)
        })
    },
    getPost ({ commit }, payload) {
      db
        .collection('posts')
        .doc(payload.id)
        .get()
        .then(async snapshot => {
          let post = snapshot.data()
          post.topics = Object.keys(post.topics)
          post.author = await getAuthorData(post.author)
          commit('setPost', post)
          commit('setLastDoc', snapshot)
        })
        .catch(err => {
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
        payload.limit = 9
      }
      db
        .collection('posts')
        .orderBy(payload.orderBy, payload.orderIn)
        .limit(payload.limit)
        .get()
        .then(snapshot => {
          // let posts = []
          Promise.all(
            snapshot.docs.map(async doc => {
              let tmp = doc.data()
              tmp.id = doc.id
              // posts.push(tmp)
              tmp.author = await getAuthorData(tmp.author)
              tmp = await addNumberOfComments(tmp)
              return tmp
            })
          ).then(posts => {
            commit('setPosts', posts)
            commit('setLastDoc', snapshot.docs.slice(-1)[0])
          })
        })
        .catch(err => {
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
        .then(async snapshot => {
          if (snapshot.docs.length === 0) {
            return
          }
          let posts = this.getters.posts
          snapshot.forEach(doc => {
            let tmp = doc.data()
            tmp.id = doc.id
            posts.push(tmp)
          })
          posts = await Promise.all(
            posts.map(async post => {
              post.author = await getAuthorData(post.author)
              post = await addNumberOfComments(post)
              return post
            })
          )
          commit('setPosts', posts)
          commit('setLastDoc', snapshot.docs.slice(-1)[0])
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    },
    getPostRealtime ({ commit }, payload) {
      commit(
        'setRealtimeRef',
        db
          .collection('posts')
          .doc(payload.id)
          .onSnapshot(async snapshot => {
            let post = snapshot.data()
            post.id = snapshot.id
            post.topics = Object.keys(post.topics)
            post.author = await getAuthorData(post.author)
            commit('setPost', post)
          })
      )
    },
    getPostsRealtime ({ commit }, payload = {}) {
      if (!payload.orderBy) {
        payload.orderBy = 'createdAt'
      }
      if (!payload.orderIn) {
        payload.orderIn = 'desc'
      }
      if (!payload.limit) {
        payload.limit = 1000
      }
      let ref = {}
      if (payload.where) {
        ref = db
          .collection('posts')
          .where(payload.where.value, '==', payload.where.equals)
          .orderBy(payload.orderBy, payload.orderIn)
          .limit(payload.limit)
      } else {
        ref = db
          .collection('posts')
          .orderBy(payload.orderBy, payload.orderIn)
          .limit(payload.limit)
      }
      commit(
        'setRealtimeRef',
        ref.onSnapshot(async snapshot => {
          let posts = []
          snapshot.forEach(doc => {
            let tmp = doc.data()
            tmp.id = doc.id
            posts.push(tmp)
          })
          posts = await Promise.all(
            posts.map(async post => {
              post.author = await getAuthorData(post.author)
              await addNumberOfComments(post)
              return post
            })
          )
          commit('setPosts', posts)
        })
      )
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
            topics: arrayToObject(payload.topics.map(topic => topic.toLowerCase())),
            promoted: payload.promoted
          })
          .then(re => {
            payload.vm.$router.push(`/post/${re.id}`)
          })
      } else {
        console.log('Not logged in!')
      }
    },
    editPost ({ commit }, payload) {
      let id = payload.id
      let topicsArray = payload.topics.slice()
      payload.topics = arrayToObject(payload.topics.map(topic => topic.toLowerCase()))
      delete payload.id
      db
        .collection('posts')
        .doc(id)
        .update(payload)
        .then(() => {
          payload.topics = topicsArray
          commit('editPost', payload)
        })
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
    },

    getTopicPosts ({ commit }, payload) {
      db
        .collection('posts')
        .where('topics.' + payload.topic, '==', true)
        .get()
        .then(snapshot => {
          // let posts = []
          Promise.all(
            snapshot.docs.map(async doc => {
              let tmp = doc.data()
              tmp.id = doc.id
              // posts.push(tmp)
              tmp.author = await getAuthorData(tmp.author)
              return tmp
            })
          ).then(posts => {
            commit('setPosts', posts)
            commit('setLastDoc', snapshot.docs.slice(-1)[0])
          })
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
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
    },
    topics (state) {
      return state.topics
    },
    summaries: state => (maxCharacters = 300) => {
      const imageRegex = /!\[.*?\]\((.+?)\)/
      return state.posts.map(post => {
        let imageUrl = imageRegex.exec(post.message)
        let text = iframeRegex.test(post.message) ? post.message : removeMd(post.message).substring(0, maxCharacters)
        return Object.assign({}, post, {
          message: text,
          imageUrl: imageUrl && imageUrl[1] ? imageUrl[1] : null
        })
      })
    },
    filteredTopics: state => (text) => {
      return state.topics.filter((option) => {
        return option.topic
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
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

async function addNumberOfComments (post) {
  let comments = (await db
    .collection('comments')
    .where('post', '==', db.doc('posts/' + post.id))
    .orderBy('createdAt', 'desc')
    .get()).docs
  post.numberOfComments = comments.length
  return post
}

function arrayToObject (array) {
  return array.reduce((acc, topic) =>
    Object.assign(acc, { [topic]: true }), {}
  )
}
