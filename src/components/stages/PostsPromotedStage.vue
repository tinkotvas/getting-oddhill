<template>
  <div id="promoted-stage">
    <article 
    v-if="isPromoted(key) && posts"
      v-for="(post, key) of posts"
      :key="key">
    <div
      class="media post"
      @click="$router.push('/post/'+post.id)">
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p class="post-header"><strong>{{ post.heading }}</strong></p>
          <p class="post-content"><vue-markdown :source="post.message | truncate"/>
          </p>
        </div>

      </div>
      <div class="media-right"> <div class="level">
        <div class="level-left"/>
        <div v-if="post.imageUrl" class="level-right">
            <figure class="image is-128x128">
              <img
                :src="post.imageUrl"/>
            </figure>
        </div>
      </div>

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
                :to="'/topic/'+ post.topics">
                {{ key }}
              </router-link>
            </b-taglist>
          </div>
        </nav>
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

  .promoted-title {
    font-size: 22px;
  }

  .topic-btn {
    padding:2px;
  }

  .post{
    cursor: pointer;
  }

  article{
    margin-bottom:10px;
  }
 
</style>
