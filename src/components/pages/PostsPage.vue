<template>
  <div id="posts">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            class="column">
            <posts-all-stage/>
          </div>
          <div
            id="puffs"
            class="column is-3">
            <profiles-puff class="box"/>
            <topics-puff class="box"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostsAllStage from '../stages/PostsAllStage'
// Puffs
import ProfilesPuff from '../puffs/ProfilesPuff'
import TopicsPuff from '../puffs/TopicsPuff'
export default {
  components: {
    PostsAllStage,
    ProfilesPuff,
    TopicsPuff
  }
}
</script>

<style>

</style>
