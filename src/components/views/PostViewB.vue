<template>
  <div class="posts">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            class="box"
            style="color: red">
            <slot/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostsAllStage from '../stages/PostsAllStage'

export default {
  components: {
    PostsAllStage
  }
}
</script>
