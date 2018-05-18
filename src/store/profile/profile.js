import { db } from '../../main.js'

export default {
  state: {
    // profileData: null
  },
  mutations: {
    // setProfileData (state, payload) {
    //   if (state.currentUser) {
    //     state.currentUser.profileData = payload
    //     state.profileData = payload
    //   }
    // },

  },
  actions: {
    updateProfilePhoto ({ rootState, commit }, payload) {
      db.doc('users/' + rootState.user.currentUser.id).update({profilePhoto: payload}).then(() => {
        commit('setProfilePhoto', payload)
      })
    }
  },
  getters: {

  }
}
