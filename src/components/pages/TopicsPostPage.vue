<template>
  <section class="section">
    <div class="columns is-centered">
      <div class="columns">
        <div class="column">
          <input
            class="input"
            id="search-input"
            type="text"
            placeholder="Sök...">
        </div>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column is-10-desktop">
        <article
          class="media"
          v-if="posts"
          v-for="(post, key) of posts"
          :key="key">
          <div class="media-content no-overflow">
            <div class="content">
              <h4><strong><router-link :to="'/post/'+ post.id">{{ post.heading }}</router-link></strong><br>
                <span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
              <span><small>{{ (post.author && post.author.username) ? post.author.username : 'Anonym' }}</small></span></h4>
              <router-link :to="'/post/'+post.id">
                <p> {{ post.message | truncate }}</p>
                <figure class="image is-128x128 img">
                  <img
                    :src="post.imageUrl"
                    v-if="post.imageUrl">
                </figure>
              </router-link>

            </div>
          </div>
        </article>
      </div>
    </div>

  </section>
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
      return this.$store.getters.summaries(250)
    }
  },
  mounted: function () {
    this.$store.dispatch('getTopicPosts', {topic: 'Oddhill'})
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
