<template>
  <div id="posts-stage">
    <b-loading
      :is-full-page="isFullPage"
      :active.sync="isLoading"
      :can-cancel="true"/>
    <article
      class="media"
      v-for="(post, key) of promotedPosts"
      :key="key">

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

        <button class="delete" @click="deletePost(post.id)">

        </button> 

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
  methods: {
    deletePost(id) {
      db.collection('posts').doc(id).delete()
    }
  },
  mounted () {
    this.$bind('promotedPosts', db.collection('posts').orderBy('createdAt', 'desc'))
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
