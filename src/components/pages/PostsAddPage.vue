<template>
  <div id="postsadd">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            class="column">
            <post-add-stage class="box"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostAddStage from '../stages/PostAddStage'
// Puffs
import ProfilesPuff from '../puffs/ProfilesPuff'
import TopicsPuff from '../puffs/TopicsPuff'
export default {
  components: {
    PostAddStage,
    ProfilesPuff,
    TopicsPuff
  }
}
</script>

<style>

</style>
