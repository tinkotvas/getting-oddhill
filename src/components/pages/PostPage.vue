<template>
  <div id="post">
    <section class="section">
      <div class="container">
        <div class="columns is-centered">
          <div class="column is-12-tablet is-8-desktop">
            <post-view-stage
              :post="post"
              ref="poststage"/>
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
  mounted () {
    this.getPost()
  },
  methods: {
    getPost: function(){
      this.$store.dispatch('getPost', {
        id: this.$route.params.id
        })
    },
    initLoading (vm) {
      // vm.loadingComponent = vm.$loading.open({
      //   container: vm.$refs.poststage.$el
      // })
    }
  },
  computed: {
    post(){
      return this.$store.getters.posts
    }
  }
}
</script>

<style>

</style>
