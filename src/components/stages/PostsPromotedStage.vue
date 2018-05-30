<template>
  <div id="promoted-stage">
    <article
      v-if="isPromoted(key) && posts"
      v-for="(post, key) of posts"
      :key="key">
      <div
        class="media post"
        @click="$router.push('/post/'+post.id)">
        <!-- <div class="media-left">
          <div class="level">
            <div class="level-left"
              v-if="post.imageUrl">
              <figure class="image is-3by2">
                <img :src="post.imageUrl"/>
              </figure>
            </div>
          </div>
        </div> -->
        <!--Main content -->
        <div class="media-content no-overflow">
          <div class="content">
            <span class="post-header"
            style="margin-top: 25px; margin-bottom: 0px; "><h4>{{ post.heading }}</h4></span>
            <span class="time-author"><small>{{ (post.author && post.author.username) ? post.author.username :'Anonym' }}</small></span> | <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>

              <div class="media-left">
                <div class="level">
                  <div class="level-left"
                    v-if="post.imageUrl">
                    <figure class="image is-3by2" style="margin-top:15px; margin-left: 15px;">
                      <img :src="post.imageUrl"/>
                    </figure>
                  </div>


              <div>
                <p class="post-content"
                style="margin-top: 15px;"><vue-markdown :source="post.message"/>
                </p>
              </div>
              </div>
              </div>

          </div>
        </div>

      </div>
      <nav class="level is-mobile"
      style="padding-top: 10px;">
        <div class="level-left">
            <b-taglist>
            <router-link
              v-for="(topic,key) of post.topics"
              :key="key"
              class="button topics-btn"
              :to="'/topic/'+ key">
              {{ key }}
            </router-link>
          </b-taglist>
        </div>
        <div class="level-right">
          <div class="level-item">
            <router-link :to="'/post/'+ post.id"><small><a v-if="post.numberOfComments !== undefined"> {{ post.numberOfComments }} kommentarer</a></small></router-link>
          </div>
        </div>
      </nav>
    </article>
  </div>
</template>

<script>
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'

const fadeChars = 25
let truncateChars = 250

export default {
  filters: {

    truncate: function (value) {
      return value.substring(0, 300) + '...'
    }
    // truncate: function(value) {
    //   let truncated =
    //     value.length > truncateChars ? value.substring(0, truncateChars) : value
    //   if (truncated.length >= truncateChars) {
    //     // truncated = truncated + '...'
    //     // truncateChars = truncated.length
    //     let faded = Array.prototype.map.call(
    //       truncated.substring(truncateChars - fadeChars, truncateChars),
    //       (char, index) => {
    //         let x = index / fadeChars
    //         let quickMaffs = 1 - 0.12 * x - 0.88 * x ** 2
    //         return `<span style="opacity: ${quickMaffs};">${char}</span>`
    //       }
    //     )
    //     truncated =
    //       truncated.substring(0, truncateChars - fadeChars) + faded.join('')
    //   }
    //   return truncated
    // }
  },
  components: {
    VueMarkdown
  },
  props: ['posts'],
  methods: {
    isPromoted: function(index) {
      return this.posts[index].promoted
    },
    localTimeSv: function (value) {
    let date = this.$moment(value)
    return date.locale('sv').format('dddd Do MMMM YYYY')
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
.content {
  max-height: 16em;
  overflow: hidden;
}

.media{
  align-items: center;
}

// figure{
//   display: flex;
//   justify-content: center;
// }

figure.image {
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
  max-height: 200px;
  width: 200px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 40px #bac9dc;

}
.image.is-square img, .image.is-1by1 img, .image.is-4by3 img,.image.is-3by2 img, .image.is-16by9 img, .image.is-2by1 img{
  object-fit: cover;
}

.post-header {
  font-size: 20px;
}

/* .post-content {
  padding: 0 50px;;
} */


.topics-btn {
  @include topic-post-btn;
}

.post {
  cursor: pointer;
}

  article{
    margin-bottom:96px;
  }

</style>
