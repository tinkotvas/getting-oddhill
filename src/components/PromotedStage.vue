<template>
  <div id="promoted-stage">
    <article class="media" v-for="(post, key) of promotedPosts" :key="key">
      <!--Left content like img-->

      <!--Main content -->
      <div class="media-content">
        <div class="content">
          <p><strong>{{post.heading}}</strong><br>
          {{(post.message).substring(0,155)}}...</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
          </div>
          <div class="level-right">
            <router-link v-for="(topic,key) of post.topics" :key="key" class="is-info is-small tag" :to="'topic?'+topic">
              {{topic}}
            </router-link>
          </div>
        </nav>
      </div>
    </article>
  </div>
<!--
  <div id="promoted-stage" class="column">
    <div id="promoted-post" class="" v-for="(post, key) of promotedPosts" :key="key">
      <h6>{{post.heading}}</h6>
      <p class=""> {{(post.message).substring(0,155)}}...</p>
      <div class="">
        <p class="">{{post.author}}</p>
        <div class="">
          <a class="is-primary is-medium tag" href="#" v-for="(topic,key) of post.topics" :key="key">
                      {{topic}}
                    </a>
        </div>
      </div>
    </div>
  </div>
  -->
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

</style>
