<template>
<div class="section">
  <div class="columns is-centered">
    <div class="column is-9">
        <div class="posts">
          <div
            id="pages"
            class="column">
            <div id="posts">

              <article
                class="level media is-loading"
                v-for="(post, key) of posts"
                :key="key">

                <div class="media-content no-overflow">
                    <div class="content">
                      <h4><strong><router-link :to="'/post/'+ post.id">{{ post.heading }}</router-link></strong><br>
                        <span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                      <span><small>{{ post.author.username || 'Anonym' }}</small></span></h4>
                      <router-link :to="'/post/'+post.id">
                        <p> {{ post.message | truncate }}</p>
                      </router-link>
                    </div>
                  </div>
                  <div class="media-right">
                    <div class="level">
                      <div class="level-left"/>
                      <div class="level-right">
                        <figure class="img is-128x128">
                          <img
                            :src="post.imageUrl"
                            v-if="post.imageUrl">
                        </figure>
                      </div>
                    </div>
                  </div>
                  <div class="level-item">
                   <nav
                      class="level is-mobile"
                      style="margin-top:30px">
                      <!-- <div class="level-left">
                        <router-link :to="'/post/'+ post.id"><small><a> {{ 4 }} kommentarer</a></small></router-link>
                      </div> -->
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
    </div>
  </div>
</template>

<script>
// Stages
import PostsPage from '../pages/PostsPage'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    PostsPage,
    VueMarkdown
  },

  filters: {
    truncate: function (value) {
      return value.substring(0, 300) + '...'
    }
  },
  props: {
    posts: {
      type: Array,
      default: () => []
    }
  },
  methods: {
    localTimeSv: function (value) {
      let date = this.$moment(value)
      return date.locale('sv').format('dddd Do MMMM YYYY')
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

.profile-box {
 background-color: rgba(152, 226, 248, 0.212);
}
img {
  height: 200px;
  width: auto;
  float: right;
}

.level-item{
  align-self: flex-end;
  justify-content: flex-start;

}
</style>

// export default {
//   components: {
//     PostsPage
//   }
// }
// </script>



<style scoped>

.profile-box {
 background-color: rgba(152, 226, 248, 0.212);
}
img {
  height: 200px;
  width: auto;
  float: right;
}

.level-item{
  align-self: flex-end;
  justify-content: flex-start;

}
</style>
