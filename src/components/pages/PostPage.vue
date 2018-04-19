<template>
  <div id="post">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
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
  data () {
    return {
      post: []
    }
  },
  mounted () {
    this.bindPost()
  },
  methods: {
    bindPost: function () {
      this.$bind('post', db.collection('posts').doc(this.$route.params.id))
        .then((doc) => {
          this.$refs.poststage.loadingComponent.close()
        })
        .catch((error) => {
          console.log('error in loading: ', error)
        })
    },
    initLoading (vm) {
      vm.loadingComponent = vm.$loading.open({
        container: vm.$refs.poststage.$el
      })
    }
  }
}
</script>

<style>

</style>
