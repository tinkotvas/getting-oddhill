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
        for(let image in this.imageUrls){

            storage.ref(`images/${this.imageUrls[image].srvName}`).getDownloadURL().then((url) => {
                this.imageUrls[image].url = url
                console.log(this.imageUrls[image])
            })
            
        }

    }
  }
}

</script>

<style scoped lang="scss">

</style>
