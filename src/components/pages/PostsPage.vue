<template>
  <div class="posts">
    <div
      class="content"
      ref="postsstage"
      id="posts-stage">

      <section class="section">
        <div class="container">
          <div class="level">
            <div class="level-left"/>
            <div class="view-btn level-right">
              <div class="container">
                <div
                  class="view-btn field is-grouped"
                  align="right">
                  <p class="control">
                    <a
                      class="button is-primary"
                      @click="postsView='post-view-a'">View A</a>
                    <a
                      class="button is-primary"
                      @click="postsView='post-view-b'">View B</a>
                    <a
                      class="button is-primary"
                      @click="postsView='post-view-c'">View C</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      <div class="columns">
        <div class="column is-10 is-offset-1">
          <div class="box">
            <h3><strong>Posts</strong></h3>
            <keep-alive>
              <component
                :is="postsView"
                :posts="posts"
                v-bind="{getMorePosts}"/>
            </keep-alive>
          </div>
        </div>
      </div>

      <div class="level">
        <div class="level-item">
          <button
            id="getMoreBtn"
            class="button"
            v-if="showMoreButton"
            @click="getMorePosts()">Get more..</button>
        </div>
      </div>

    </div>
  </div>
</template>

<script>
import { db } from '../../main.js'
// Stages
import PostViewA from '../views/PostViewA'
import PostViewB from '../views/PostViewB'
import PostViewC from '../views/PostViewC'

export default {
  components: {
    PostViewA,
    PostViewB,
    PostViewC
  },
  data () {
    return {
      postsView: 'post-view-a',
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
      this.$store.dispatch('deletePost', { index: key, id })
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

<style>
.view-btn {
  float: right;
}

.no-overflow {
  overflow: hidden;
}
</style>
