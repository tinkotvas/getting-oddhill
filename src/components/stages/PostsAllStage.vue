<template>
  <b-notification
    :closable="false"
    ref="postsstage"
    id="posts-stage"
  >
    <article
      class="media is-loading"
      v-for="(post, key) of posts"
      :key="key">
      <!--Left content like img-->
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p><strong><router-link :to="'/post/'+post.id">{{ post.heading }}</router-link></strong><br>
            {{ (post.message).substring(0,155) }}...</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left">
            <small v-if="post.author && post.author.username">{{ post.author.username }}</small>
          </div>
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

      <button
        class="delete"
        @click="deletePost(key, post.id)"/>
    </article>
    <div class="level">
      <div class="level-item">
        <button
          id="getMoreBtn"
          class="button"
          v-if="showMoreButton"
          @click="getMorePosts()">Get more..</button>
      </div>
    </div>
  </b-notification>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      isLoading: false,
      showMoreButton: true
    }
  },
  computed: {
    posts () {
      return this.$store.getters.posts
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    deletePost (key, id) {
      this.$store.dispatch('deletePost', { index: key, id})
    },
    initLoading () {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.postsstage.$el
      })
    },
    getPosts () {
      this.$store.dispatch('getPosts')
    },
    getMorePosts () {
      this.$store.dispatch('getMorePosts')
    }
  }
}

</script>

<style scoped lang="scss">
.no-overflow {
  overflow: hidden;
}
.notification{
  padding:1.25rem;
  min-height:100px;
}
</style>
