<template>
  <div class="posts">
    <div
      class="content"
      ref="postsstage"
      id="posts-stage">

      <div class="container">
        <div class="level is-mobile">
          <div class="center-absolute text-center">
            <span
              class="button post-btn is-medium"
              @click="showEditor()">New Post</span>
          </div>
          <div class="level-left"/>
          <div class="level-right">
            <div
              class="view-btns field is-grouped"
              align="right">
              <p class="control">
                <!-- <a
                  class="button view-btn"
                  @click="savePostsView('post-view-a')">A</a> -->
                <!-- <a
                  class="button view-btn"
                  @click="savePostsView('post-view-b')"><b-icon icon="view-grid"/></a> -->
                <!-- <a
                  class="button view-btn"
                  @click="savePostsView('post-view-c')"><b-icon icon="view-headline"/></a> -->
              </p>
            </div>
          </div>
        </div>
        <div class="columns is-centered">
          <transition
            name="slide-fade"
            :duration="{ enter: 500, leave: 800 }">
            <content-editor v-if="editorVisible"/>
          </transition>
        </div>
      </div>
      <div
        ref="allPosts"
        class="section load-overlay">
        <keep-alive>
          <component
            :is="postsView"
            :posts="posts"
            v-bind="{getMorePosts}"/>
        </keep-alive>
      </div>

      <section class="section">
        <div class="level">
          <div class="level-item">
            <button
              id="getMoreBtn"
              class="button post-btn"
              v-if="showMoreButton"
              @click="getMorePosts()">Get more posts...</button>
          </div>
        </div>
      </section>

    </div>
  </div>
</template>

<script>
import { db } from '../../main.js'
// Stages
import PostViewA from '../views/PostViewA'
import PostViewB from '../views/PostViewB'
import PostViewC from '../views/PostViewC'
import ContentEditor from '../stages/ContentEditor'

export default {
  components: {
    PostViewA,
    PostViewB,
    PostViewC,
    ContentEditor
  },
  data () {
    return {
      isLoading: false,
      showMoreButton: true,
      editorVisible: false
    }
  },
  computed: {
    posts () {
      return this.$store.getters.summaries(250)
    },

    postsView () {
      return this.$store.getters.postsView
    }
  },
  watch: {
    posts: function () {
      this.load.forEach(el => {
        el.close()
      })
    }
  },
  mounted () {
    this.getPosts()
    this.initLoadingOverlay()
  },
  methods: {
    showEditor () {
      this.editorVisible = !this.editorVisible
    },
    deletePost (key, id) {
      this.$store.dispatch('deletePost', { index: key, id })
    },
    initLoadingOverlay () {
      this.load = this.$plugins.load(this, [this.$refs.allPosts])
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

<style scoped lang="scss">
@import "../../styles/variables.scss";

.view-btns{
  float: right;
}

.no-overflow {
  overflow: hidden;
}

b-icon{
  margin-top: 2px;
}

.post-btn{
    font: Helvetica,Arial,sans-serif;
    font-size: 12px;
    color: #fff;
    display: inline-block;
    border-radius: 30px;
    font-weight: 500;
    min-width: 150px;
    padding-left: 40px;
    padding-right: 40px;
    padding-top: 15px;
    padding-bottom: 35px;
    text-decoration: none;
    cursor: pointer;
    justify-content: center;
    }

.view-btn{
  font: "Proxima N W01 Smbd",Helvetica,Arial,sans-serif;
  color: #fff;
  font-weight: 500;
  border-radius: 50px;
  padding: 20px;
  text-decoration: none;
  cursor: pointer;
}

.center-absolute {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
@media (min-width: 500px) {
  .text-center {
    text-align: center;
  }
}

</style>
