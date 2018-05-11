<template>
<div class="section">
  <div class="columns is-centered">
    <div class="column is-8">
        <div class="posts">
          <div
            id="pages"
            class="column">
            <div id="posts">

              <article
                class="media"
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

                  <!-- <div>
                    <div class="level is-mobile">
                      <div class="level-left">
                        <router-link :to="'/post/'+ post.id"><small><a> {{ 4 }} kommentarer</a></small>
                        </router-link>
                      </div>
                      <div class="level-right"/>
                    </div>
                  </div> -->

                </div>
                <div class="media-right">
                  <div class="level">

                    <div class="level-left"/>
                    <div class="level-right">
                      <router-link :to="'/post/'+post.id">
                        <figure class="image is-128x128">
                          <img
                            :src="post.imageUrl"
                            v-if="post.imageUrl">
                        </figure>
                      </router-link>
                    </div>
                  </div>
                  <nav
                    class="level is-mobile">
                    <div class="level-left"/>
                    <div class="level-right">
                      <b-taglist>
                        <router-link
                          v-for="(topic,key) of post.topics"
                          :key="key"
                          class="is-info is-small tag"
                          :to="'/topic/'+ post.topics">
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

<style scoped>

.profile-box {
 background-color: rgba(152, 226, 248, 0.212);
}
.image img {
  position: relative;
  top: 50%;
  transform: translateY(-50%);
}
</style>
