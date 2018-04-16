<template>
  <div id="storage">
    <div
      v-for="(image, key) in imageUrls"
      :key="key"
      >
      <img :src="image.url">
    </div>

  </div>
</template>

<script>
import { db, storage } from '../../main.js'

export default {
  data () {
    return {
      imagesRef: null,
        imageUrls: {
            'img1': { srvName: 'dejan.png', url: null },
            'img2': { srvName: 'tin.jpeg', url: null }
        }
    }
  },
  mounted () {
    this.imagesRef = storage.ref('images')
    this.getFileUrls()
  },
  methods: {
    getFileUrls () {
        Object.keys(this.imageUrls).map((key, index)=> {
            storage.ref(`images/${this.imageUrls[key].srvName}`).getDownloadURL().then((url) => {
                this.imageUrls[key].url = url
            })
        });

    }
  }
}

</script>

<style scoped lang="scss">

</style>
