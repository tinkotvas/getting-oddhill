<template>
  <div class="column">
      <h1>
          LatestPuff
      </h1>
  </div>
</template>

<script>
  const axios = require('axios')   
  const json = require('../assets/json/posts.json')

export default {
  data(){
      return {
          isLoading: false,
          latestPosts: json.posts
      }
  },

  mounted: function (){
    this.getData()
  },

  methods: {
    getData: function (event) {
        axios
          .get('http://192.168.2.107:1337/post/')
          .then(({ data}) => {
            this.latestPosts = data
          })
          .catch(err => (this.isLoading = false))
    }
  }
}
</script>





