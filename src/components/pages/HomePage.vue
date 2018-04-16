<template>
  <div id="home">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            class="column">
            <posts-promoted-stage class="box"/>
          </div>
          <div
            id="puffs"
            class="column is-3">
            <profiles-puff class="box"/>
            <topics-puff class="box"/>
            <latest-puff class="box"/>
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
  }
}
</script>

<style>

</style>
