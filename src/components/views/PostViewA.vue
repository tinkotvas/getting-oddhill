<template>
  <div class="posts">
    <section class="section">
      <div class="container">
        <div class="column">
          <div
            id="pages"
            class="column">
            <slot/>

          </div>
        </div>
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

<!--<template>
  <div class="posts">
    <section class="section">
      <div class="container">
         <div class="container">
          <div
            class="view-btn field is-grouped"
            align="right">
            <p class="control">
              <a
                class="button is-primary"
                @click="postsView='post-view-a'">View A</a>
              <a
                class="button is-primary"
                @click="postsView='post-view-b'">View B</a>
              <a
                class="button is-primary"
                @click="postsView='post-view-c'">View C</a>
            </p>
          </div>
        </div>
        <keep-alive>
          <component :is="postsPage">
            <div class="columns">
              <div
                id="posts"
                class="column">
                <posts-page/>
              </div>
            </div>
          </component>
        </keep-alive>
      </div>
    </section>
  </div>
</template> -->

<!-- <script>
// // Stages
// import PostsPage from '../pages/PostsPage'

// export default {
//   components: {
//     PostsPage
//   }
// }
// </script>


