<!--<template>
  <div id="posts">
    <section class="section">
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
        <keep-alive>
          <component :is="postsView">
            <div class="columns">
              <div
                id="stages"
                class="column">
                <posts-page/>
              </div>
            </div>
          </component>
        </keep-alive>
        <div
          v-for="(post, key) of allPosts"
          :key="key"/>
      </div>
    </section>
  </div>
</template> -->
<template>
  <div class="posts">
    <b-notification
      class="content"
      :closable="false"
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
        <keep-alive>
         <component :is="postsView" :posts="posts" v-bind="{getMorePosts}"/>
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

      </section>
    </b-notification>
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
