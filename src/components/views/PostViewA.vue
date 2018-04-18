<template>
  <div class="posts">
    <section class="section">
      <div class="container">
        <!-- <div class="column">
          <div
            id="stages"
            class="column">

            <slot/>
          </div> -->
          <keep-alive>
          <component :is="postsPage">
            <div class="columns">
              <div
                id="stages"
                class="column">
                <posts-page/>
              </div>
            </div>
          </component>
        </keep-alive>
        </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostsPage from '../pages/PostsPage'

export default {
  components: {
    PostsPage
  }
}
</script>
