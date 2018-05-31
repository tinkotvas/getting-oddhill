<template>
  <div
    id="home"
    class="section">
    <div class="pattern-bg"/>
    <div class="columns is-centered">
      <div class="column is-8 is-6-fullhd">

        <topics-puff class=""/>
        <div
          ref="promoted"
          class="load-overlay">
          <posts-promoted-stage :posts="summaries"/>
        </div>
      </div>
    </div>

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
    },
    summaries () {
      return this.$store.getters.summaries(250)
    }
  },
  watch: {
    posts: function () {
      this.load.forEach(el => {
        el.close()
      })
    }
  },
  mounted: function () {
    this.getPosts()
    this.initLoadingOverlay()
  },
  methods: {
    getPosts () {
      this.$store.dispatch('getPostsRealtime')
    },
    initLoadingOverlay () {
      this.load = this.$plugins.load(this, [this.$refs.promoted])
    }
  }
}
</script>

<style lang="scss">
.profile-box {
  background-color: #fff;
}

iframe {
    display: block;
    width: 50vw;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    box-shadow: 0px 2px 40px #bac9dc;
    @media(max-width:599px) {
      width: 85vw;
      height: 200px;
    }
    @media(min-width: 600px) and (max-width: 899px){
      width: 60vw;
      height: 200px;
    }
  }


</style>
