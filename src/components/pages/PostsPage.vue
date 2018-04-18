<template>
  <div id="posts">
    <section class="section">
      <div class="container">
        <div class="view-btn field is-grouped">
          <button
            class="button is-primary is-small"
            @click="postsView='post-view-a'">View A</button>
          <button
            class="button is-primary is-small"
            @click="postsView='post-view-b'">View B</button>
          <button
            class="button is-primary is-small"
            @click="postsView='post-view-c'">View C</button>
        </div>
        <keep-alive>
          <component :is="postsView">
            <div class="columns">
              <div
                id="stages"
                class="column">
                <posts-all-stage/>
              </div>
            </div>
          </component>
        </keep-alive>
        <div
          v-for="(post, key) of allPosts"
          :key="key"/>
      </div>
    </section>
  </div>
</template>

<script>
// Stages
import PostsAllStage from '../stages/PostsAllStage'
import PostViewA from '../views/PostViewA'
import PostViewB from '../views/PostViewB'
import PostViewC from '../views/PostViewC'

export default {
  components: {
    PostsAllStage,
    PostViewA,
    PostViewB,
    PostViewC
  },
  data () {
    return {
      view: 0,
      allPosts: null,
      postsView: 'post-view-a'
    }
  }
  //   router: subRouter
}
</script>
