<template>
  <div id="post">
    <section class="section">
      <div class="container">
        <div
          class="columns is-centered"
          ref="section">
          <div class="column is-12-tablet is-8-desktop">
            <post-stage :post="post"/>
          </div>
        </div>
        <div class="columns is-centered">
          <div class="column">
            <post-comments-stage :comments="comments"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from '../../main.js'
// Stages
import PostStage from '../stages/PostStage'
import PostCommentsStage from '../stages/PostCommentsStage'
// Puffs

export default {
  components: {
    PostStage,
    PostCommentsStage
  },
  data () {
    return {
      comments: []
    }
  },
  computed: {
    post () {
      return this.$store.getters.post
    }
  },
  watch: {
    post: function () {
      this.loadingComponent.close()
    }
  },
  mounted () {
    if (this.$route.params.id != this.post.id) {
      this.getPost()
      this.initLoading()
    }
  },
  destroyed () {
    this.$store.dispatch('unsubRealtime')
    // this.$store.dispatch('forgetPost')
  },
  methods: {
    getPost: function () {
      this.$store.dispatch('getPostRealtime', {
        id: this.$route.params.id
      })
    },
    initLoading () {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.section
      })
    }
  }
}
</script>

<style lang="scss">

//for loader
.columns{
  min-height: 100px;
}
</style>
