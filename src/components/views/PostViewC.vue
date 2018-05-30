<template>
  <div class="columns is-centered">
    <div class="column is-10-desktop">
      <article
        class="media"
        v-for="(post, key) of posts"
        :key="key">
        <div class="media-content no-overflow">
          <div
            class="post content"
            @click="$router.push('/post/'+post.id)">
              <span class="time-author"><small>{{ (post.author && post.author.username) ? post.author.username : 'Anonym' }}</small></span>
              <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
            <p><fadeout :text="post.message"
            :truncate-chars="80"
            :fade-chars="15"/></p>

            <nav
              class="level">
              <div class="level-left">
               <div class="level-item">
                  <b-taglist>
                    <router-link
                      v-for="(topic,key) of post.topics"
                      :key="key"
                      class="tags-btn"
                      :to="'/topic/'+ post.topics">
                      {{ key }}
                    </router-link>
                  </b-taglist>
                </div>
              </div>
              <div class="level-left">
                 <div class="level-item">
                  <router-link :to="'/post/'+ post.id"><small><a> {{ post.numberOfComments }} kommentarer</a></small></router-link>
                </div>
              </div>
            </nav>
          </div>
        </div>
      </article>
    </div>
  </div>
</template>

<script>
// Stages
import PostsPage from '../pages/PostsPage'
import Fadeout from '../misc/Fadeout'

export default {
  components: {
    PostsPage,
    Fadeout
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

<style scoped lang="scss">
@import "../../styles/variables.scss";
.profile-box {
 background-color: rgba(152, 226, 248, 0.212);
}

.time-author{
  color: rgb(58,58,58);
}

.level-item{
  align-self: flex-end;
  justify-content: flex-start;
}

.post{
  cursor: pointer;
}

.tags-btn{
  @include topic-btn;
}
</style>
