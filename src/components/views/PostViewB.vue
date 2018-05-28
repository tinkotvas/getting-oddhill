<template>
  <div class="columns is-centered">
    <div class="column is-10-tablet is-12-mobile">
      <div class="columns is-multiline">

        <article
          class="column is-6-tablet is-4-desktop is-12-mobile"
          v-for="(post, key) of posts"
          :key="key">
          <div class="box profile-box">
            <div class="media-content">
              <div
                class="post content"
                @click="$router.push('/post/'+post.id)">
                <!-- <h4><strong>{{ post.heading }}</strong></h4> -->
                <span class="time-author"><small>{{ (post.author && post.author.username) ? post.author.username :'Anonym' }}</small></span>
                | <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                <figure
                  class="image img"
                  style="margin-bottom: 10px;">
                  <img
                    :src="post.imageUrl"
                    v-if="post.imageUrl">
                </figure>
                <p><vue-markdown :source="post.message | truncateB"/></p>


              </div>
              <div>
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

  filters: {
    truncateB: function (value) {
      return value.substring(0, 200)
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

.media-content {
  height: 400px;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
}

img{
  max-height: 250px;
  width: auto;
}

.profile-box{
  background-color: #fff;
  border: 1px solid #000;
}
figure{
  /* height: auto;
  width: 200px; */
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-top: 20px;
  margin-bottom: 5px;
}

.time-author{
  color: rgba(58,58,58);
}

figure:empty{
  display: none;
}

/* nav.topics{
  word-wrap: break-word;
} */
.post {
  cursor: pointer;
}
</style>
