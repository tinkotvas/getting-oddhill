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

            <div class="level-right">
              <div class="container">
                <div
                  class="view-btn field is-grouped"
                  align="right">
                  <p class="control">
                    <a
                      class="button is-primary"
                      @click="savePostsView('post-view-a')">A</a>
                    <a
                      class="button is-primary"
                      @click="savePostsView('post-view-b')">B</a>
                    <a
                      class="rounded button is-primary"
                      @click="savePostsView('post-view-c')">C</a>
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div class="field">
            <div class="control">
              <input
                class="input"
                type="text"
                placeholder="Post here...">
              <router-link
                class="input-dropdown-btn"
                to="/post/add">
                <b-icon
                  size="is-medium"
                  icon="plus-circle"/></router-link>
            </div>
          </div>

        </div>
      </section>

      <keep-alive>
        <component
          :is="postsView"
          :posts="posts"
          v-bind="{getMorePosts}"/>
      </keep-alive>

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
      isLoading: false,
      showMoreButton: true
    }
  },
  computed: {
    posts () {
      return this.$store.getters.posts
    },

    postsView () {
      return this.$store.getters.postsView
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
    },
    savePostsView (value) {
      this.$store.dispatch('savePostsView', value)
    }
  }
}
</script>

<style>
.view-btn{
  float: right;
}

.no-overflow {
  overflow: hidden;
}
.input{
  width: 800px;
}
b-icon{
  margin-top: 2px;
}

</style>
