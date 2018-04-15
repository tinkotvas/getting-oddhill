<template>
  <div id="promoted-stage">
    <article
      v-if="isPromoted(key)"
      class="media"
      v-for="(post, key) of promotedPosts"
      :key="key">
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p><strong>{{ post.heading }}</strong><br>
            {{ (post.message).substring(0,155) }}...</p>
        </div>
        <nav class="level is-mobile">
          <div class="level-left"/>
          <div class="level-right">
            <b-taglist>
              <router-link
                v-for="(topic,key) of post.topics"
                :key="key"
                class="is-info is-small tag"
                :to="'topic?'+topic">
                {{ topic }}
              </router-link>
            </b-taglist>
          </div>
        </nav>
      </div>
    </article>
  </div>
</template>

<script>
import { db } from '../../main.js'

export default {
  name: 'PromotedStage',
  data () {
    return {
      isLoading: false,
      promotedPosts: []
    }
  },
  mounted: function () {
    this.$bind('promotedPosts', db.collection('posts').orderBy('createdAt', 'desc'))
      .then((doc) => {
        this.isLoading = false
      })
      .catch((error) => {
        console.log('error in loading: ', error)
      })
  },
  methods: {
    isPromoted: function (index) {
      return this.promotedPosts[index].promoted
    }
  }
}
</script>

<style scoped>
 .no-overflow {
   overflow: initial
 }
</style>
