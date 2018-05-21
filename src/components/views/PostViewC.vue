<template>
  <div class="columns is-centered">
    <div class="column is-10-desktop">
      <article
        class="media"
        v-for="(post, key) of posts"
        :key="key">
        <div class="media-content no-overflow">
          <div class="content">
            <router-link :to="'/post/'+post.id">
              <p><strong>{{ post.heading }}</strong>
               <span>{{ (post.message).substring(0,80) }}...</span></p>
                <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                <small class="time-author">av</small>
                  <span class="time-author"><small>{{ post.author.username || 'Anonym' }}</small></span> </router-link>

            <nav
              class="level">
              <div class="level-left">
                <div class="level-item">
                  <router-link :to="'/post/'+ post.id"><small><a> {{ 4 }} kommentarer</a></small></router-link>
                </div>
              </div>
              <div class="level-left">
                <div class="level-item">
                  <b-taglist>
                    <router-link
                      v-for="(topic,key) of post.topics"
                      :key="key"
                      class="is-light is-small is-rounded tag"
                      :to="'/topic/'+ post.topics">
                      {{ topic }}
                    </router-link>
                  </b-taglist>
                </div>
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

export default {
  components: {
    PostsPage
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

.time-author{
  color: rgba(58,58,58);
}

.level-item{
  align-self: flex-end;
  justify-content: flex-start;
}
</style>

