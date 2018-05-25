<template>
  <div
    id="home"
    class="section">
    <div class="columns is-centered">
      <div class="column is-7">

        <topics-puff class=""/>
        <div
          ref="promoted"
          class="load-overlay">
          <posts-promoted-stage :posts="summaries"/>
        </div>
      </div>
      <div class="column is-3">
        <profiles-puff
          ref="profilesPuff"
          class="box profile-box"/>

        <div
          ref="latestpuff"
          class="load-overlay box profile-box">
          <!-- <latest-puff :posts="posts"/> -->

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
      this.load = this.$plugins.load(this, [this.$refs.promoted, this.$refs.latestpuff])
    }
  }
}
</script>

<style scoped lang="scss">
.profile-box {
  background-color: #fff;
}

</style>
