<template>
  <div id="promoted-stage">
    <article
      v-if="isPromoted(key) && posts"
      v-for="(post, key) of posts"
      :key="key">
      <div
        class="media post"
        @click="$router.push('/post/'+post.id)">
        <!--Main content -->
        <div class="media-content no-overflow">
          <div class="content">
            <span class="post-header"
            ><h4>{{ post.heading }}</h4></span>
            <span class="time-author"><small>{{ (post.author && post.author.username) ? post.author.username :'Anonym' }}</small></span> | <span class="time-author"><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>

            <div class="media-left">
              <div class="level">
                <div
                  class="level-left"
                  v-if="post.imageUrl">
                  <figure class="image is-3by2-mobile" style="margin-top:20px;">
                    <img :src="post.imageUrl"/>
                  </figure>
                </div>
                <div>
                  <p class="post-content"><vue-markdown :source="truncate(post.message)"/>
                  </p>
                </div>
              </div>
            </div>

          </div>
          <nav class="level is-mobile">
            <div class="level-right">
              <b-taglist class="columms is-multiline">
                <router-link
                  v-for="(topic,key) of post.topics"
                  :key="key"
                  class="button topics-btn"
                  :to="'/topic/'+ key">
                  {{ key }}
                </router-link>
              </b-taglist>
            </div>

            <div class="level-left">
              <div class="level-item kommentarer">
                <router-link :to="'/post/'+ post.id" class="button topics-btn"><a
                  v-if="post.numberOfComments !== undefined"> {{ post.numberOfComments }} kommentarer</a></router-link>
              </div>
            </div>
          </nav>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'
import Fadeout from '../misc/Fadeout'
import { iframeRegex } from '../../main'

export default {
  data(){
    return {
        truncateChars: 125
    }
  },


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
  components: {
    VueMarkdown
  },
  props: ['posts'],

   mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', () => {
        this.truncateChars = window.innerWidth / 10.24
      })
     this.truncateChars = window.innerWidth / 10.24
    })
  },

  methods: {
    isPromoted: function(index) {
      return this.posts[index].promoted
    },
    localTimeSv: function (value) {
    let date = this.$moment(value)
    return date.locale('sv').format('dddd Do MMMM YYYY')
    },
    truncate: function (value) {
        return iframeRegex.test(value) ? value : value.length > this.truncateChars ? (value.substring(0, this.truncateChars).trim() + '...') : value
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";

article{
  margin-bottom:96px;
  display: flex;
  flex-direction: column;
}

.content {
  overflow: hidden;
}

.media{
  align-items: center;
}

figure {
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
  margin-left: 0em;
  border-radius: 4px;
  &.image {
      max-height: 200px;
  width: 200px;
  border: none;
  box-shadow: 0px 2px 40px #bac9dc;
  overflow: alway;

  }
}

img {
  max-height: 200px;
  object-fit: cover;
  border-radius: 4px;
}

.topics-btn{
  padding-left: 0px;
}

.post-header {
  font-size: 20px;
}

.post-content{
  margin-top: 25px
}

nav {
  margin-top: 20px;
}

.topics-btn {
  @include topic-post-btn;
}

.post {
  cursor: pointer;
}

 .media-content .content {
    overflow: visible;
 }

 .kommentarer{
  size: 12px;
}

@media (max-width: 599px){
  figure {
  // position: relative;
  // top: 50%;
  // transform: translateY(-50%);
  margin-left: 0em;
  &.image {
      max-height: 200px;
  width: 200px;
  border: none;
  border-radius: 4px;
  box-shadow: 0px 2px 40px #bac9dc;
  overflow: alway;
  }

}

article{
  margin-bottom: 66px;
}
}
</style>
