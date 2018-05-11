<template>
  <div class="topics">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <input
              class="input"
              type="text"
              placeholder="Sök...">
          </div>
        </div>
      </div>
    </section>

<article
  v-if="posts"
  v-for="(post, key) of posts" :key="key">
    <div class="media-content no-overflow">
      <div class="content">
        <h4><strong><router-link :to="'/post/'+ post.id">{{ post.heading }}</router-link></strong><br>
          <span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
        <span><small>{{ post.author.username || 'Anonym' }}</small></span></h4>
        <router-link :to="'/post/'+post.id">
          <p> {{ post.message | truncate }}</p>
        </router-link>
      </div>
    </div>
  </article>

  </div>
</template>

<script>
import { db } from '../../main.js'
// Stages
export default {
  filters: {
    truncate: function (value) {
      return value.substring(0, 300) + '...'
    }
  },
  computed: {
    posts () {
      return this.$store.getters.posts
    },
    summaries () {
      return this.$store.getters.summaries(250)
    }
  },
  mounted: function () {
    this.$store.dispatch('getTopicPosts', {topic:'Oddhill'})
  },
  methods: {
    localTimeSv: function (value) {
      let date = this.$moment(value)
      return date.locale('sv').format('dddd Do MMMM YYYY')
    },

    savePostsView (value) {
      this.$store.dispatch('savePostsView', value)
    }
  }
}
</script>

<style>

</style>

