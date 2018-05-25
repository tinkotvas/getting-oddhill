<template>
  <div class="posts">
    <div
      class="content"
      ref="postsstage"
      id="posts-stage">

      <section class="section">
        <div class="container">
          <div class="level level-invisible">

            <div class="level-left"/>

            <div class="level-right">
              <div class="container">
                <div
                  class="view-btns field is-grouped"
                  align="right">
                  <p class="control">
                    <!-- <a
                      class="button view-btn"
                      @click="savePostsView('post-view-a')">A</a> -->
                    <a
                      class="button view-btn"
                      @click="savePostsView('post-view-b')"><b-icon icon="view-grid"/></a>
                    <a
                      class="button view-btn"
                      @click="savePostsView('post-view-c')"><b-icon icon="view-headline"></b-icon></a>
                  </p>
                </div>
              </div>
            </div>
          </div>
          <div class="container">
            <div class="columns">
              <div
              class="column"
              style="display:flex; justify-content:center;">
                <span
                  class="button post-btn is-medium"
                  @click="showEditor()">New Post</span>
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
      </section>
      <section class="section">
        <keep-alive>
          <component
            :is="postsView"
            :posts="posts"
            v-bind="{getMorePosts}"/>
        </keep-alive>
      </section>

      <section class="section">
        <div class="level">
          <div class="level-item">
            <button
              id="getMoreBtn"
              class="button"
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
  mounted () {
    this.getPosts()
  },
  methods: {
    showEditor () {
      this.editorVisible = !this.editorVisible
    },
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
    color: #fff;
    display: inline-block;
    background: #272457;
    border-radius: 30px;
    font-weight: 500;
    min-width: 150px;
    padding-left: 30px;
    padding-right: 30px;
    padding-top: 15px;
    padding-bottom: 40px;
    text-decoration: none;
    cursor: pointer;
    justify-content: center;
    }
  .post-btn:hover{
      color: #fff;
}

.view-btn{
  font: "Proxima N W01 Smbd",Helvetica,Arial,sans-serif;
  color: #fff;
  font-weight: 500;
  background: #272457;
  border-radius: 30px;
  padding: 20px;
  text-decoration: none;
  cursor: pointer;
}
.view-btn:hover {
  color:#fff;
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

@media (max-width: 773px){
  .level-invisible{
    display: none;
  }
}

</style>
