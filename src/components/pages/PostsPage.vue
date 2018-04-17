<template>
  <div>
    <button
      class="button is-primary"
      @click="postsView='post-view-a'">View A</button>
    <button
      class="button is-primary"
      @click="postsView='post-view-b'">View B</button>
    <keep-alive>
      <component :is="postsView">
        Hej
      </component>
    </keep-alive>
    <div
      v-for="(post, key) of allPosts"
      :key="key">
      <!-- <router-view/> -->

      <!-- <router-view name="viewD"/> -->
      1
      <!-- <div v-if="view === 0">

      </div>
      <div v-if="view === 1">

      </div>
      <div v-if="view === 2">

      </div> -->
    </div>
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
