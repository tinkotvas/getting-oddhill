
import { storage } from '../../main.js'

const uuidv1 = require('uuid/v1')
const fileRegex = /\.[^.\s]+$/i

export default {
  state: {
    imageCache: {}
  },
  mutations: {
    setImageCache (state, payload) {
      state.imageCache = payload
    },
    addToImageCache (state, payload) {
      state.imageCache[payload.name] = payload
      console.log(state.imageCache)
    }
  },
  actions: {
    addImageToCache ({ commit }, payload) {
      payload.callback(getBlobPath(payload.file), '')
      commit('addToImageCache', { name: payload.file.name, blobUrl: window.URL.createObjectURL(payload.file) })
    }
  },
  getters: {
    imageCache (state) {
      return state.imageCache
    }
  }
}

function getBlobPath (file, callback) {
  return window.URL.createObjectURL(file)
}
