<template>
  <div id="post">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div class="column">
            <post-view-stage/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostViewStage from '../stages/PostViewStage'
// Puffs

export default {
  components: {
    PostViewStage
  }
}
</script>

<style>

</style>
