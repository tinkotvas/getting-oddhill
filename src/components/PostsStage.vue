<template>
  <div id="posts-stage">
    <article
      class="media"
      v-for="(post, key) of promotedPosts"
      :key="key">
      <b-loading :is-full-page="isFullPage" :active.sync="isLoading" :canCancel="true"></b-loading>
      <!--Left content like img-->
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p><strong>{{ post.heading }}</strong><br>
            {{ (post.message).substring(0,155) }}...</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left"/>
          <div class="level-right">
            <b-taglist>
              <router-link
                v-for="(topic,key) of post.topics"
                :key="key"
                class="is-info is-small tag"
                :to="'topic?'+topic">
                {{ topic }}
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
import { db } from '../main.js'


export default {
  data () {
    return {
      isLoading: true,
      isFullPage: false,
      promotedPosts: []
    }
  },
  mounted () {
    this.$bind('promotedPosts', db.collection('posts').orderBy('createdAt'))
      .then((doc) => {
        this.isLoading = false
      })
      .catch((error) => {
        console.log('error in loading: ', error)
      })
    }
  // ,
  // firestore () {
  //   return {
  //     promotedPosts: db.collection('posts').orderBy('createdAt')
  //     }
  //   }
  }

</script>

<style scoped>
.no-overflow {
  overflow: initial;
}
</style>
