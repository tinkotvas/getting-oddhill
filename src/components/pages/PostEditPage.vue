<template>
  <div id="postsedit">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            ref="editstage"
            class="column load-overlay">
            <post-edit-stage
              :post="post"
              class="box"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostEditStage from '../stages/PostEditStage'
// Puffs

export default {
  components: {
    PostEditStage
  },
  computed: {
    post () {
      return this.$store.getters.post
    }
  },
  watch: {
    post: function () {
      if (this.$route.params.id != this.post.id) { this.load.close() }
    }
  },
  mounted () {
    if (this.$route.params.id != this.post.id) {
      this.initLoadingOverlay()
      this.getPost()
    }
  },
  methods: {
    getPost: function () {
      this.$store.dispatch('getPost', {
        id: this.$route.params.id
      })
    },
    initLoadingOverlay () {
      this.load = this.$plugins.load(this, this.$refs.editstage)
    }
  }
}
</script>

<style>

</style>
