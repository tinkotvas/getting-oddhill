<template>
  <div id="promoted-stage">
    <article
      v-if="isPromoted(key) && posts"
      class="media"
      v-for="(post, key) of posts"
      :key="key">
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p><strong><router-link :to="'/post/'+post.id">{{ post.heading }}</router-link></strong><br>
            <vue-markdown :source="post.message | truncate"/>
          </p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left"/>
          <div class="level-right">
            <b-taglist>
              <router-link
                v-for="(topic,key) of post.topics"
                :key="key"
                class="is-info is-small tag"
                :to="'/topic/'+ post.topics">
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
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'

export default {
  filters: {
    truncate: function (value) {
      return value.substring(0, 300) + '...'
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
   max-height: 8em;
   overflow:hidden;
}
</style>
