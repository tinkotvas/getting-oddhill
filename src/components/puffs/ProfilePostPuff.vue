<template>
  <div class="columns is-centered">
    <div class="column is-12">
      <div
        ref="ProfilePostPuff">
        <h3><strong>Inlägg</strong></h3>
        <div class="columns is-multiline">
          <div
            class="media column is-4 no-overflow"
            v-if="postsData.length > 0"
            v-for="(post, key) in postsData"
            :key="key">
            <div class="media-content">
              <div class="content">
                <span v-if="post.message">
                  <strong><router-link :to="'/post/'+post.id">{{ post.heading }}</router-link></strong>
                  <br><span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span><br>
                  <vue-markdown :source="post.message | truncate"/>
                  <!-- <strong>{{ post.heading }}</strong>
                  <br><span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                  <br>
                  <vue-markdown :source= "post.message | truncate"/> -->
                </span>
              </div>

              <div class="media-right"> <div class="level">
                <div class="level-left"/>
                <div class="level-right">
                  <router-link :to="'/post/'+post.id">
                    <figure class="image is-128x128">
                      <img
                        v-if="post.imageUrl"
                        :src="post.imageUrl">
                    </figure>
                  </router-link>
                </div>
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

            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  filters: {
    truncate: function (value) {
      let truncated = value.length > 300 ? value.substring(0, 300) : value
      if (truncated.length >= 300) {
        truncated = truncated + '...'
      }
      return truncated
    }
  },
  props: ['posts'],
  data () {
    return {
      postsData: []
    }
  },
  mounted: function () {
    this.getPostsData()
  },
  methods: {
    localTimeSv: function (value) {
      let date = this.$moment(value)
      return date.locale('sv').format('LL')
    },
    getPostsData () {
      let currentUser = this.$store.getters.currentUser
      if (!currentUser) return []
      this.postsData = db.collection('posts').where('author', '==', db.doc('users/' + currentUser.id)).orderBy('createdAt').get().then((data) => {
        this.postsData = data.docs.map((doc) => doc.data())
      })
    }
  }
}

</script>

<style scoped>
.content{
   max-height: 16em;
   overflow:hidden;
}
  .image img {
    position: relative;
    top: 50%;
    transform: translateY(-50%);
  }
</style>
