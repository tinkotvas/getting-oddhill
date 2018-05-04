<template>
  <div class="columns">
    <div class="column is-10 is-offset-1">
      <div class="box">

        <div class="posts">
          <div
            id="pages"
            class="column">
            <div id="posts">

              <article
                class="media is-loading"
                v-for="(post, key) of posts"
                :key="key">
                <div class="media-content no-overflow">
                  <div class="content">
                    <router-link :to="'/post/'+post.id">
                      <h4><strong>{{ post.heading }}</strong>
                      <span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span> <span><small>Paulina HT</small></span></h4>
                      <p> {{ (post.message).substring(0,155) }}...</p>
                    </router-link>


                    <nav class="level is-mobile">
                      <div class="level-left">
                        <router-link :to="'/post/'+ post.id"><small><a> {{ 4 }} kommentarer</a></small></router-link>
                      </div>
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
                  </router-link>
                  </div>
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
