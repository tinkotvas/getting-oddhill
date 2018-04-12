<template>
  <div id="promoted-stage" class="col-12 p-0 border">
    <div id="promoted-post" class="m-2" v-for="(post, key) of promotedPosts" :key="key">
      <h6>{{post.author.username}}</h6>
      <p class="m-0"> {{(post.body).substring(0,155)}}...</p>
      <div class="d-flex">
        <p class="m-0 mr-auto font-italic p-1">{{post.author.username}}</p>
        <div class="promoted-topics align-items-end p-1">
          <!-- <b-tag type="is-primary" size="is-medium">Medium</b-tag> -->
          <!-- <a class="is-primary is-medium tag p-1 ml-1" href="#" v-for="(topic,key) of post.topics" :key="key">
                      {{topic}}
                    </a> -->
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
// const json = require('../assets/json/posts.json')

export default {
  name: 'PromotedStage',
  data () {
    return {
      isLoading: false,
      promotedPosts: []
    }
  },
  methods: {
    getData: function (event) {
      this.isLoading = true
      axios.get('http://192.168.2.107:1337/post/')
        .then(({
          data
        }) => {
          this.promotedPosts = data
        })
        .catch(err => this.isLoading = false)
    }
  },
  mounted: function () {
  		this.getData()
  	}
}
</script>

<style scoped>
  a {
    background: #ADD8E6;
  }
</style>
