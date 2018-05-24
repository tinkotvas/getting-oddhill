<template>
  <div id="promoted-stage">
    <div class="promoted-title"><strong>Posts</strong></div>
    <article
      v-if="isPromoted(key) && posts"
      class="media"
      v-for="(post, key) of posts"
      :key="key">
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p class="post-header"><strong><router-link :to="'/post/'+post.id">{{ post.heading }}</router-link></strong></p><br>
            <p class="post-content"><vue-markdown :source="post.message | truncate"/>
          </p>
        </div>

      </div>
      <div class="media-right"> <div class="level">
        <div class="level-left"/>
          <div class="level-right">
            <router-link :to="'/post/'+post.id">
            <figure  class="image is-128x128">
              <img v-if="post.imageUrl" :src="post.imageUrl">
            </figure>
            </router-link>
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
      </div>
    </article>
  </div>
</template>

<script>
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'

export default {
  filters: {
    truncate: function (value) {
      let truncated = value.length > 250 ? value.substring(0, 250) : value
      if (truncated.length >= 250) {
        truncated = truncated + '...'
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
</style>
