<template>
  <div id="promoted-stage">
    <article v-if="isPromoted(key)" class="media" v-for="(post, key) of promotedPosts" :key="key">
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
      const json = require('../assets/json/posts.json')
      this.promotedPosts = json.posts
    },
    isPromoted: function(index){
      return this.promotedPosts[index].promoted
    }

    // getData: function (event) {
    //   this.isLoading = true
    //   axios.get('http://192.168.2.107:1337/post/')
    //     .then(({
    //       data
    //     }) => {
    //       this.promotedPosts = data
    //     })
    //     .catch(err => this.isLoading = false)
    // }
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
