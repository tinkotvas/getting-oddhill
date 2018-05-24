<template>
  <div class="columns is-centered">
    <div class="column is-10-tablet is-12-mobile">
      <div class="columns is-multiline">

        <article
          class="column is-4-desktop is-6-tablet is-12-mobile"
          v-for="(post, key) of posts"
          :key="key">
          <div class="box profile-box">
            <div class="media-content">
              <div class="content">
                <h4><strong><router-link
                  :to="'/post/'+post.id">{{ post.heading }}</router-link></strong>
                  <br><span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span> <small class="time-author">av</small> <span class="time-author"><small>
                    {{ (post.author && post.author.username) ? post.author.username : 'Anonym' }}</small></span></h4>
                <router-link :to="'/post/'+post.id">
                  <p><vue-markdown :source="post.message | truncate"/></p>
                  <figure class="image is-128x128 img">
                    <img
                      :src="post.imageUrl"
                      v-if="post.imageUrl">
                  </figure>
                </router-link>
              </div>


              <nav class="level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <b-taglist>
                      <router-link
                        v-for="(topic,key) of post.topics"
                        :key="key"
                        class="is-light is-small tag"
                        :to="'/topic/'+ post.topics">
                        {{ topic }}
                      </router-link>
                    </b-taglist>
                  </div>
                </div>
                <div class="level-right"/>
              </nav>
              <nav class="level is-mobile">
                <div class="level-left">
                  <a class="level-item">
                    <router-link :to="'/post/'+ post.id"><small> {{ post.numberOfComments }} kommentarer</small></router-link>
                  </a>
                </div>
              </nav>
            </div>
          </div>
        </article>
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
      return value.substring(0, 100)
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


img{
  height: 200px;
  width: auto;
  display: block;
  margin-left: auto;
  margin-right: auto;
  margin-bottom: 10px;
}

.time-author{
  color: rgba(58,58,58);
}

</style>
