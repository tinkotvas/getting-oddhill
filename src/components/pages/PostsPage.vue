<!--<template>
  <div id="posts">
    <section class="section">
      <div class="container">
        <div
          class="view-btn field is-grouped"
          align="right">
          <p class="control">
            <a
              class="button is-primary"
              @click="postsView='post-view-a'">View A</a>
            <a
              class="button is-primary"
              @click="postsView='post-view-b'">View B</a>
            <a
              class="button is-primary"
              @click="postsView='post-view-c'">View C</a>
          </p>
        </div>
        <keep-alive>
          <component :is="postsView">
            <div class="columns">
              <div
                id="stages"
                class="column">
                <posts-page/>
              </div>
            </div>
          </component>
        </keep-alive>
        <div
          v-for="(post, key) of allPosts"
          :key="key"/>
      </div>
    </section>
  </div>
</template> -->
<template>
  <div class="posts">
    <b-notification
    class="content"
      :closable="false"
      ref="postsstage"
      id="posts-stage">
      <section class="section">
        <div class="container">
          <div class="level">
            <div class="level-left"/>
            <div class="view-btn level-right">
              <div class="container">
                <div
                  class="view-btn field is-grouped"
                  align="right">
                  <p class="control">
                    <a
                      class="button is-primary"
                      @click="postsView='post-view-a'">View A</a>
                    <a
                      class="button is-primary"
                      @click="postsView='post-view-b'">View B</a>
                    <a
                      class="button is-primary"
                      @click="postsView='post-view-c'">View C</a>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
        <keep-alive>
          <component :is="postsView">
            <div id="posts">
              <article
                class="media is-loading"
                v-for="(post, key) of promotedPosts"
                :key="key">
                <!--Left content like img-->
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
          </component>
        </keep-alive>

        <div class="level">
          <div class="level-item">
            <button
              id="getMoreBtn"
              class="button"
              v-if="showMoreButton"
              @click="getData()">Get more..</button>
          </div>
        </div>

      </section>
    </b-notification>
  </div>
</template>




<script>
import { db } from '../../main.js'
// Stages
import PostViewA from '../views/PostViewA'
import PostViewB from '../views/PostViewB'
import PostViewC from '../views/PostViewC'

export default {
  components: {
    PostViewA,
    PostViewB,
    PostViewC
  },
  data () {
    return {
      view: 0,
      allPosts: null,
      postsView: 'post-view-a',
      isLoading: false,
      postRef: db.collection('posts'),
      promotedPosts: [],
      newPostChecker: null,
      newPostCheckerBound: false,
      showMoreButton: false
    }
  },
  watch: {
    newPostChecker: function (d) {
      if (this.newPostCheckerBound) {
        console.log('boom', d)
      }
    }
  },
  mounted () {
    this.getData()
    // watcher
    this.$bind(
      'newPostChecker',
      this.postRef.orderBy('createdAt', 'desc').limit(1)
    )
      .then(doc => {
        this.newPostCheckerBound = true
      })
      .catch(error => {
        console.log('error in loading: ', error)
      })
  },
  methods: {
    deletePost (key, id) {
      this.$delete(this.promotedPosts, key)
      this.postRef.doc(id).delete()
    },
    initLoading () {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.postsstage.$el
      })
    },
    getData () {
      let limit = 6
      if (this.isLoading === true) {
        return
      }
      this.initLoading()
      this.isLoading = true
      ;(this.lastDocument
        ? this.postRef
          .orderBy('createdAt', 'desc')
          .startAfter(this.lastDocument)
          .limit(limit)
        : this.postRef.orderBy('createdAt', 'desc').limit(limit)
      )
        .get()
        .then(snapshot => {
          this.isLoading = false
          this.loadingComponent.close()
          this.showMoreButton = !(snapshot.docs.length < limit)
          // continue only if we have any documents
          if (snapshot.docs.length == 0) {
            return
          }
          snapshot.forEach(doc => {
            console.log('doc', doc)
            let tmp = doc.data()
            tmp.id = doc.id
            this.promotedPosts.push(tmp)
          })
          this.lastDocument = snapshot.docs[snapshot.docs.length - 1]
        })
        .catch(err => {
          console.log('Error getting documents', err)
        })
    }
    //   router: subRouter
  }
}
</script>

<style>
.view-btn {
  float: right;
}

.no-overflow {
  overflow: hidden;
}
</style>
