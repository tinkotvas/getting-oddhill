<template>
  <div class="posts">
    <div
      class="content"
      ref="postsstage"
      id="posts-stage">

      <div class="container">
        <div class="columns text-center">
          <div class="column is-12-mobile">
            <span
              class="button post-btn"
              @click="showEditor()">new post</span>
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
              @click="getMorePosts()">get more posts...</button>
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

.view-btns {
  float: right;
}

.no-overflow {
  overflow: hidden;
}

b-icon {
  margin-top: 2px;
}

.post-btn {
    @include btn;
}

.center-absolute {
  position: absolute;
  left: 0;
  right: 0;
  margin: 0 auto;
}
.text-center {
    text-align: center;
  }

@media (max-width: 500px) {
  .text-center {
    text-align: center;
  }
}

.button{
  z-index: 2;
}

.slider-fade{
  z-index: 1;
}

.slide-fade-enter-active {
  transition: all .3s ease;
}
.slide-fade-leave-active {
  transition: all .3s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}
.slide-fade-enter, .slide-fade-leave-to {
  transform: translateY(-100px);
  opacity: 0;
}

</style>
