
import { storage } from '../../main.js'
const uuidv1 = require('uuid/v1')
const fileRegex = /\.[^.\s]+$/i

export default {
  state: {
    imageCache: {}
  },
  mutations: {
    addToImageCache (state, payload) {
      state.imageCache[payload.name] = payload
    },
    setStoragePath (state, payload) {
      if (!state.imageCache[payload.name]) {
        state.imageCache[payload.name] = {}
      }
      state.imageCache[payload.name].storagePath = payload.storagePath
    },
    clearImageCache (state, payload) {
      state.imageCache = {}
    }
  },
  actions: {
    addImageToCache ({ commit }, payload) {
      let name = payload.file.name
      let blobPath = window.URL.createObjectURL(payload.file)
      commit('addToImageCache', { name, blobPath })
      if (payload.callback) {
        payload.callback(blobPath, '')
      }
      this.dispatch('uploadToStorage', payload)
    },
    uploadToStorage ({ commit, dispatch }, payload) {
      let file = payload.file
      let fileEnding = fileRegex.exec(file.name)

      storage.ref().child('images/' + this.getters.currentUser.id + '/' + uuidv1() + ((fileEnding && fileEnding[0]) ? fileEnding[0] : ''))
        .put(payload.file)
        .then((snapshot) => {
          commit('setStoragePath', { name: file.name, storagePath: snapshot.downloadURL })
          if (payload.profile) {
            dispatch('updateProfilePhoto', snapshot.downloadURL)
          }
        })
    },
    clearImageCache ({ commit }, payload) {
      commit('clearImageCache')
    }
  },
  getters: {
    imageCache (state) {
      return state.imageCache
    }
  }
}
