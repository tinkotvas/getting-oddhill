<template>
  <div class="columns is-centered">
    <div class="column is-9">

      <div class="posts">
        <div id="pages">
          <div id="posts">

            <div class="columns is-multiline">

              <article
                class="column is-4-desktop is-6-tablet is-12-mobile"
                v-for="(post, key) of posts"
                :key="key">
                <div class="box profile-box">
                  <h4><strong><router-link
                    :to="'/post/'+post.id">{{ post.heading }}</router-link></strong>
                  <br><span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span> <span><small>{{post.author.username || Anonym}}</small></span></h4>
                  <router-link :to="'/post/'+post.id">
                    <p><vue-markdown :source="post.message | truncate"/></p>
                  </router-link>
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
                  <!-- <nav class="level is-mobile">
                    <div class="level-left">
                      <router-link :to="'/post/'+ post.id"><small><a> {{ 4 }} kommentarer</a></small></router-link>
                    </div>
                    <div class="level-right"/>
                  </nav> -->
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

  filters:{
    truncate: function (value) {
      return value.substring(0, 300)
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
 height: 250px;
}

img{
  height: 200px;
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}
</style>
