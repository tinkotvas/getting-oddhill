<template>
  <div id="promoted-stage" class="column">
    <div id="promoted-post" class="" v-for="(post, key) of promotedPosts" :key="key">
      <h6>{{post.heading}}</h6>
      <p class=""> {{(post.message).substring(0,155)}}...</p>
      <div class="">
        <p class="">{{post.author}}</p>
        <div class="">
          <!-- <b-tag type="is-primary" size="is-medium">Medium</b-tag> -->
          <a class="is-primary is-medium tag" href="#" v-for="(topic,key) of post.topics" :key="key">
                      {{topic}}
                    </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const axios = require('axios')
const json = require('../assets/json/posts.json')

export default {
  name: 'PromotedStage',
  data () {
    return {
      isLoading: false,
      promotedPosts: json.posts
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
