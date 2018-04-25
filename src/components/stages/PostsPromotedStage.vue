<template>
  <div id="promoted-stage">
    <article
      v-if="isPromoted(key) && promotedPosts"
      class="media"
      v-for="(post, key) of promotedPosts"
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
  computed: {
    promotedPosts () {
      return this.$store.getters.posts
    }
  },
  mounted: function () {
    this.getPosts()
  },
  destroyed () {
    this.$store.dispatch('unsubRealtime')
  },
  methods: {
    isPromoted: function (index) {
      return this.promotedPosts[index].promoted
    },
    getPosts () {
      this.$store.dispatch('getPostsRealtime', { where: { value: 'promoted', equals: true }})
    }
  }
}
</script>

<style scoped>
 .no-overflow {
   overflow: initial
 }
 .content{
   max-height: 8em;
   overflow:hidden;
}
</style>
