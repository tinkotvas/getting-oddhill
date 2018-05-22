import * as firebase from 'firebase'
import { db } from '../../main.js'

export default {
  state: {
    currentUser: undefined,
    authReady: false,
    profileData: null
  },
  mutations: {
    setUser (state, payload) {
      state.currentUser = payload
    },
    setProfileData (state, payload) {
      if (state.currentUser) {
        state.currentUser.profileData = payload
        state.profileData = payload
      }
    },
    setAuthReady (state, payload) {
      state.authReady = payload
    }
  },
  actions: {
    signUp ({ commit }, payload) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(payload.email, payload.password)
        /* .then((user) => {
          const newUser = {
            id: user.uid,
            name: user.displayName,
            email: user.email,
            photoUrl: user.photoURL
          }
          commit('setUser', newUser)
        }) */
        .catch((error) => {
          console.log(error)
        })
    },
    signIn ({ commit }, payload) {
      firebase
        .auth()
        .setPersistence(firebase.auth.Auth.Persistence.LOCAL)
        .then(function () {
          firebase
            .auth()
            .signInWithEmailAndPassword(payload.email, payload.password)
            /* .then((user) => {
              const newUser = {
                id: user.uid,
                name: user.displayName,
                email: user.email,
                photoUrl: user.photoURL
              }
              commit('setUser', newUser)
            }) */
            .catch((error) => {
              console.log(error)
            })
        })
    },
    updateUserInfo ({ commit }, payload) {
      commit('setUser', {
        id: payload.uid,
        name: payload.displayName,
        email: payload.email,
        photoUrl: payload.photoURL
      })
      db.collection('profiles').doc(payload.uid).get().then((doc) => {
        if (doc.exists) {
          commit('setProfileData', doc.data())
        }
      })
    },
    signOut ({ commit }) {
      firebase.auth().signOut()
      commit('setUser', null)
    }
  },
  getters: {
    currentUser (state) {
      return state.currentUser
    },
    profileData (state) {
      return state.profileData
    }
  }
}
