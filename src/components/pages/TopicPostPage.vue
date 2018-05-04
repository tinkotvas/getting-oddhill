<template>
  <div class="section">
    <div class="container">
      <topic-post-page :posts="posts"/>
    </div>
  </div>
</template>

<script>
import { db } from '../../main.js'
// Stages
import TopicPostPage from '../pages/TopicPostPage'
// Puffs

export default {
  components: {
    TopicPostPage
  },

  computed: {
    posts () {
      return this.$store.getters.posts
    }
  }
}

</script>
