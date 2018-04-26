<template>
  <div id="postsedit">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            class="column">
            <post-edit-stage class="box"/>
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
  }
}
</script>

<style>

</style>
