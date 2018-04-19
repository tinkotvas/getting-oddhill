<template>
  <div id="storage">
    <b-field>
      <b-upload
        v-model="dropFiles"
        multiple
        drag-drop>
        <section class="section">
          <div class="content has-text-centered">
            <p>
              <b-icon
                icon="upload"
                size="is-large"/>
            </p>
            <p>Drop your files here or click to upload</p>
          </div>
        </section>
      </b-upload>
    </b-field>

    <div class="tags">
      <span
        v-for="(file, index) in dropFiles"
        :key="index"
        class="tag is-primary" >
        {{ file.name }}
        <button
          class="delete is-small"
          type="button"
          @click="deleteDropFile(index)"/>
      </span>
    </div>
    <div
      v-for="(image, key) in allPageImages"
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
      storageRef: storage.ref(),
      allPageImages: {
        'img1': { filenameOnServer: 'dejan.png', url: null },
        'img2': { filenameOnServer: 'tin.jpeg', url: null }
      },
      dropFiles: []
    }
  },
  watch: {
    dropFiles: function (file) {
      console.log('Dropped file')
      this.storageRef.child('images/' + file[0].name)
        .put(file[0])
        .then(function (snapshot) {
          console.log('FIle uploaded')
        })
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
    },
    deleteDropFile (index) {
      this.dropFiles.splice(index, 1)
    }
  }
}

</script>

<style scoped lang="scss">

</style>
