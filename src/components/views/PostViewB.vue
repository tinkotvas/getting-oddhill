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
                <!-- <h4><strong><router-link
                  :to="'/post/'+post.id">{{ post.heading }}</router-link></strong></h4> -->
                <span class="time-author"><small>{{ (post.author && post.author.username) ? post.author.username : 'Anonym' }}</small></span>
                <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                <router-link :to="'/post/'+post.id">
                   <figure class="image is-4by5 img">
                    <img
                      :src="post.imageUrl"
                      v-if="post.imageUrl">
                  </figure>
                  <p><vue-markdown :source="post.message | truncate"/></p>

                </router-link>
              </div>
              <nav class="topics level is-mobile">
                <div class="level-left">
                  <div class="level-item">
                    <b-taglist>
                      <router-link
                        v-for="(topic,key) of post.topics"
                        :key="key"
                        class="is-light is-small tag"
                        :to="'/topic/'+ post.topics">
                        {{ key }}
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
.profile-box{
  background-color: #fff;
  border: 1px solid #000;
}
figure{
  height: auto;
  width: 200px;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 20px;
}

.time-author{
  color: rgba(58,58,58);
}

figure:empty{
  display: none;
}

nav.topics{
  word-wrap: break-word;
}

</style>
