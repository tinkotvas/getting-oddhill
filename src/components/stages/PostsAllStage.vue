<template>
  <b-notification
    :closable="false"
    ref="postsstage"
    id="posts-stage"
  >
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
          <div class="level-left">
            <small>{{ post.author }}</small>
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
      </div>

      <button
        class="delete"
        @click="deletePost(key, post.id)"/>
    </article>
    <div class="level">
      <div class="level-item">
        <button
          id="getMoreBtn"
          class="button"
          v-if="showMoreButton"
          @click="getData()">Get more..</button>
      </div>
    </div>
  </b-notification>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      isLoading: false,
      postRef: db.collection('posts'),
      promotedPosts: [],
      newPostChecker: null,
      newPostCheckerBound: false,
      showMoreButton: true
    }
  },
  watch: {
    newPostChecker: function (d) {
      if (this.newPostCheckerBound) { console.log('boom', d) }
    }
  },
  mounted () {
    this.getData()
    // watcher
    this.$bind('newPostChecker', this.postRef.orderBy('createdAt', 'desc').limit(1)).then((doc) => {
      this.newPostCheckerBound = true
    })
      .catch((error) => {
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
      let limit = 2

      if (this.isLoading === true) { return }

      this.initLoading()
      this.isLoading = true;
      (this.lastDocument ? this.postRef.orderBy('createdAt', 'desc').startAfter(this.lastDocument).limit(limit) : this.postRef.orderBy('createdAt', 'desc').limit(limit)).get()
        .then(snapshot => {
          this.loadingComponent.close()
          this.isLoading = false
          // continue only if we have any documents
          if (snapshot.docs.length == 0) {
            return
          } else if (snapshot.docs.length < limit) {
            this.showMoreButton = false
          }
          snapshot.forEach(doc => {
            console.log('doc', doc)
            let tmp = doc.data()
            tmp.id = doc.id
            this.promotedPosts.push(tmp)
          })
          this.lastDocument = snapshot.docs[snapshot.docs.length - 1]
        }).catch(err => {
          console.log('Error getting documents', err)
        })
    }
  }
  // ,
  // firestore () {
  //   return {
  //     promotedPosts: db.collection('posts').orderBy('createdAt')
  //     }
  //   }
  // this.$bind('promotedPosts', this.postRef.orderBy('createdAt', 'desc'))
  //       .then((doc) => {
  //         loadingComponent.close()
  //       })
  //       .catch((error) => {
  //         console.log('error in loading: ', error)
  //       })
}

</script>

<style scoped lang="scss">
.no-overflow {
  overflow: hidden;
}
.notification{
  padding:1.25rem;
  min-height:100px;
}
</style>
