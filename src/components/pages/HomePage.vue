<template>
  <div id="home">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div ref="promoted" class="container">
            <div class="column">
              <posts-promoted-stage :posts="posts" class="box"/>
            </div>
          </div>
          <div class="column is-3">
            <profiles-puff class="box"/>
            <topics-puff class="box"/>
            <div ref="puff" class="container">
              <latest-puff :posts="posts" class="box"/>
            </div>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostsPromotedStage from '../stages/PostsPromotedStage'
// Puffs
import ProfilesPuff from '../puffs/ProfilesPuff'
import TopicsPuff from '../puffs/TopicsPuff'
import LatestPuff from '../puffs/LatestPuff'

export default {
  components: {
    PostsPromotedStage,
    ProfilesPuff,
    TopicsPuff,
    LatestPuff
  },
  computed: {
    posts () {
      return this.$store.getters.posts
    }
  },
  mounted: function () {
    this.getPosts()
    this.initLoadingOverlay()
  },
  watch:{
    posts:function(){
      this.load.forEach(el => {
        el.close()
      })
    }
  },
  methods: {
    getPosts () {
      this.$store.dispatch('getPostsRealtime')
    },
    initLoadingOverlay(){
      this.load = this.$x.load(this, [this.$refs.promoted, this.$refs.puff])
    }
  }
}
</script>

<style lang="scss">
.posts-promoted-stage{
  min-height:100px;
}


</style>
