<template>
  <div class="posts">
    <section class="section">
      <div class="container">
        <div class="column">
          <div
            id="pages"
            class="column">
            <div id="posts">
              <article
                class="media is-loading"
                v-for="(post, key) of posts"
                :key="key">
                <!--Left content like img-->
                <!--Main content -->
                <div class="media-content no-overflow">
                  <div class="content">
                    <p><strong>{{ post.heading }}</strong><br>
                      {{ (post.message).substring(0,155) }}...</p>
                  </div>
                  <nav class="level is-mobile">
                    <div class="level-left"/>
                    <div class="level-right">
                      <b-taglist>
                        <router-link
                          v-for="(topic,key) of post.topics"
                          :key="key"
                          class="is-info is-small tag"
                          :to="'topic?'+topic">
                          {{ topic }}
                        </router-link>
                      </b-taglist>
                    </div>
                  </nav>
                </div>
              </article>
            </div>

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
  },
   props: {
    posts: {
      type: Array,
      default: () => []
    }

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


