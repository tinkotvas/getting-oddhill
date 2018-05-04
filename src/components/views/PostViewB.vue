<template>
  <div class="columns is-centered">
    <div class="column is-10">

        <div class="posts">
          <div id="pages">
            <div id="posts">

              <div class="columns is-multiline">
                <article
                  class="column is-3-desktop is-6-tablet is-12-mobile"
                  v-for="(post, key) of posts"
                  :key="key">
                  <div class="box">
                  <router-link
                    :to="'/post/'+post.id">
                    <p><strong><router-link
                      :to="'/post/'+post.id">{{ post.heading }}</router-link></strong><br>
                    <br><span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                    <vue-markdown :source="post.message | truncate"/></p>
                  </router-link>
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

            </div>
          </div>
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
      return value.substring(0, 300)
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

<style>

</style>
