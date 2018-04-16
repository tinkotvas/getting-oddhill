<template>
  <div id="storage">
    <div
      v-for="(image, key) in allPageImages"
      :key="key"
    >
      <img :src="image.url">
    </div>

  </div>
</template>

<script>
import { storage } from '../../main.js'

export default {
  data () {
    return {
      allPageImages: {
        'img1': { filenameOnServer: 'dejan.png', url: null },
        'img2': { filenameOnServer: 'tin.jpeg', url: null }
      }
    }
  },
  mounted () {
    this.getFileUrls()
  },
  methods: {
    getFileUrls () {
      Object.keys(this.allPageImages).map((key, index) => {
        storage.ref(`images/${this.allPageImages[key].filenameOnServer}`).getDownloadURL().then((url) => {
          this.allPageImages[key].url = url
        })
      })
    }
  }
}

</script>

<style scoped lang="scss">

</style>
