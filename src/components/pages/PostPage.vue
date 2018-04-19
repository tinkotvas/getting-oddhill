<template>
  <div id="post">
    <section class="section">
      <div class="container">
        <div
          class="columns is-centered"
          ref="section">
          <div class="column is-12-tablet is-8-desktop">
            <post-view-stage :post="post"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from '../../main.js'
// Stages
import PostViewStage from '../stages/PostViewStage'
// Puffs

export default {
  components: {
    PostViewStage
  },
  computed: {
    post () {
      return this.$store.getters.posts
    }
  },
  watch: {
    post: function () {
      this.loadingComponent.close()
    }
  },
  mounted () {
    this.getPost()
    this.initLoading()
  },
  methods: {
    getPost: function () {
      this.$store.dispatch('getPost', {
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
