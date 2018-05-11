<template>
  <div class="columns is-centered">
    <div class="column is-10-desktop">
      <article
        class="media"
        v-for="(post, key) of posts"
        :key="key">
        <div class="media-content no-overflow">
          <div class="content">
            <h4><strong><router-link :to="'/post/'+ post.id">{{ post.heading }}</router-link></strong></h4><br>
              <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}<small>av</small>
            {{ post.author.username || 'Anonym' }}</small></span>
            <router-link :to="'/post/'+post.id">
              <p> {{ post.message | truncate }}</p>
            </router-link>
          </div>
          <!-- <figure class="img media-right is-128x128">
            <img
              :src="post.imageUrl"
              v-if="post.imageUrl">
          </figure> -->
          <nav class="level">
            <div class="level-left">
              <div class="level-item">
                <router-link :to="'/post/'+ post.id"><small><a> {{ 4 }} kommentarer</a></small></router-link>
              </div>
            </div>
            <div class="level-right">
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
          </nav>
        </div>
      </article>

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
img {
  height: 200px;
  width: auto;
  float: right;
}

.level-item{
  align-self: flex-end;
  justify-content: flex-start;
}

.time-author{
  color: rgba(58,58,58);
}
</style>
