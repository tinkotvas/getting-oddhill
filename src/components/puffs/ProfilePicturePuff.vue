<template>
  <div class="profile-picture" id="">
    <picture-input

      ref="pictureInput"
      @change="onChange"
      width="200"
      height="200"
      :removable="true"
      accept="image/jpeg, image/png, image/gif"
      buttonClass="ui button primary"
      :customStrings="{
        upload: '<h1>Bummer!</h1>',
        drag: 'Drag a photo, 😺 GIF or GTFO'}">

    </picture-input>

    <!-- <button @click="attemptUpload" v-bind:class="{disabled: !image}">
      Upload
    </button> -->

  </div>
</template>

<script>

import PictureInput from 'vue-picture-input'
// import axios from 'axios';
// import { log } from 'util';

export default {
  name: 'app',
  data () {
    return {
    }
  },
  components: {
    PictureInput
  },
  methods: {
    onChange (image) {
      console.log('New picture selected!')
      if (image) {
        this.$store.dispatch('uploadToStorage',{file:this.$refs.pictureInput.file, profile: true})
        console.log('Picture loaded.')
        this.image = image
      } else {
        console.log('FileReader API not supported: use the <form>, Luke!')
      }
    }
  }
}
// export default function (url, file, name = 'Avatar') {
//   if (typeof url !== 'string') {
//     throw new TypeError('Exepted a string, got ${typeof url}');
//   }

//   methods: {
//     onChanged() {
//       console.log("New picture loaded");
//       if (this.$refs.pictureImput.file) {
//         this.image = this.$ref.pictureInput.file;
//       } else {
//         console.log("Old browser. No support for Filereader API");
//       }
//     },
//     onRemoved() {
//       this.image = '';
//     },
//     attemptUpload() {
//       if (this.image) {
//         FormDataPost('http://localhost:8080/user/picture', this.image).then(response=> {
//           if (response.data.success) {
//             this.image = '';
//             console.log("Image uploaded successfully!!");
//           }
//         })
//         .catch(err=>{
//           console.error(err);
//         });
//       }
//     }
//   }
// }

</script>

<style>

</style>
