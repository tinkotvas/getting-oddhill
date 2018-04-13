<template>
    <div id="posts-stage">
        <article class="media" v-for="(post, key) of promotedPosts" :key="key">
            <!--Left content like img-->
            <!--Main content -->
            <div class="media-content no-overflow">
            <div class="content">
                <p><strong>{{post.heading}}</strong><br>
                {{(post.message).substring(0,155)}}...</p>
            </div>
            <nav class="level is-mobile">
                <div class="level-left">
                </div>
                <div class="level-right">
                <b-taglist>
                  <router-link v-for="(topic,key) of post.topics" :key="key" class="is-info is-small tag" :to="'topic?'+topic">
                    {{topic}}
                </router-link>
                </b-taglist>
                </div>
            </nav>
            </div>
        </article>
    </div>
</template>

<script>
const axios = require('axios')
const json = require('../assets/json/posts.json')

export default {
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
 .no-overflow {
   overflow: initial
 }
</style>
