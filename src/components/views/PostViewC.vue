<template>
  <div class="columns is-centered">
    <div class="column is-8-desktop" style="margin-top: 15px;">
      <article
        class="media"
        v-for="(post, key) of posts"
        :key="key">
        <div class="media-content no-overflow">
          <div
            class="post content"
            @click="$router.push('/post/'+post.id)">
              <span class="time-author"><small>{{ (post.author && post.author.username) ? post.author.username : 'Anonym' }}</small></span> |
              <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
            <h1 style="margin-top: 15px; margin-bottom: 10px;">{{ post.heading }}</h1>
            <p v-if="(!iframeRegex.test(post.message))" style="margin-top: 15px;"> <fadeout :text="post.message"
            :truncate-chars="125"
            :fade-chars="4" :dots="true" :fade="false" :offset="2"/> </p>
            <p v-else v-html="post.message"></p>

            <nav class="level is-mobile">
              <div class="level-left">
                <div class="level-item">
                  <router-link
                    v-for="(topic,key) of post.topics"
                    :key="key"
                    class="button topics-btn"
                    :to="'/topic/'+ key">
                    {{ key }}
                  </router-link>
                </div>
              </div>

              <div class="level-right">
                <div class="level-item">
                  <router-link
                    :to="'/post/'+ post.id"
                    class="button topics-btn"
                    v-if="post.numberOfComments !== undefined">
                    {{ post.numberOfComments }} kommentarer
                  </router-link>
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
import { iframeRegex } from '../../main'

export default {
  data () {
    return {iframeRegex: iframeRegex}
  },
  components: {
    PostsPage,
    Fadeout
  },
   filters: {
    truncate: function (value) {
      return value.substring(0, 125) + '...'
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

.topics-btn{
  @include topic-post-btn;
  padding-left: 0px;
}

</style>
