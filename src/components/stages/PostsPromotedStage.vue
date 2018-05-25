<template>
  <div id="promoted-stage">
    <div class="promoted-title"><strong>posts</strong></div>
    <article
      v-if="isPromoted(key) && posts"
      class="media"
      v-for="(post, key) of posts"
      :key="key">
      <!--Main content -->
      <div  class="media-content no-overflow">
        <div class="content">
          <p class="post-header"><strong>{{ post.heading }}</strong></p><br>
          <p class="post-content"><vue-markdown :source="post.message | truncate"/>
          </p>
        </div>

      </div>
      <div class="media-right">
        <div class="level">
        <div class="level-left"/>
        <div class="level-right">
            <figure class="image is-128x128">
              <img
                v-if="post.imageUrl"
                :src="post.imageUrl">
            </figure>
        </div>
      </div>

        <nav class="level is-mobile">
          <div class="level-left"/>
          <div class="level-right">
            <b-taglist>
              <router-link
                v-for="(topic,key) of post.topics"
                :key="key"
                class="is-primary is-small tag topic-btn"
                :to="'/topic/'+ key">
                {{ key }}
              </router-link>
            </b-taglist>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'

const fadeChars = 35
let truncateChars = 250

export default {
  filters: {
    truncate: function (value) {
      let truncated = value.length > truncateChars ? value.substring(0, truncateChars) : value
      if (truncated.length >= truncateChars) {
        // truncated = truncated + '...'
        // truncateChars = truncated.length
        let faded = Array.prototype.map.call(truncated.substring(truncateChars - fadeChars, truncateChars), (char, index) => {
          let x = (index / fadeChars)
          let quickMaffs = (1 - 0.12 * x - 0.88 * (x ** 2))
          return `<span style="opacity: ${quickMaffs};">${char}</span>`
        })
        truncated = truncated.substring(0, truncateChars - fadeChars) + faded.join('')
      }
      return truncated
    }
  },
  components: {
    VueMarkdown
  },
  props: ['posts'],
  methods: {
    isPromoted: function (index) {
      return this.posts[index].promoted
    }
  }
}
</script>

<style scoped>
.content{
  max-height: 16em;
  overflow:hidden;
}
.image img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}

.post-header {
  font-size: 20px;
}

/* .post-content {
  padding: 0 50px;;
} */

.promoted-title strong{
  font-size: 32px;
  color: rgb(42, 41, 52);
}

.topic-btn {
  padding:2px;
}

.post-header {
font-family: Arial, Helvetica, sans-serif;
font-size: 24px;
}
</style>
