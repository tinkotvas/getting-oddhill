<template>
  <b-notification
    :closable="false"
    ref="postsstage"
    id="posts-stage"
  >
    <article
      class="media is-loading"
      v-for="(post, key) of posts"
      :key="key">
      <!--Left content like img-->
      <!--Main content -->
      <div class="media-content no-overflow">
        <div class="content">
          <p><strong><router-link :to="'/posts/'+post.id">{{ post.heading }}</router-link></strong><br>
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
          @click="getMorePosts()">Get more..</button>
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
      showMoreButton: true
    }
  },
  computed: {
    posts () {
      return this.$store.getters.posts
    }
  },
  mounted () {
    this.getPosts()
  },
  methods: {
    deletePost (key, id) {
      // this.$delete(this.posts, key)
      // this.postRef.doc(id).delete()
      this.$store.dispatch('deletePost', { index: key, id})
    },
    initLoading () {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.postsstage.$el
      })
    },
    getPosts () {
      this.$store.dispatch('getPosts')
    },
    getMorePosts () {
      this.$store.dispatch('getMorePosts')
    }
    // ,
    // getData () {
    //   let limit = 2
    //   if (this.isLoading === true) { return }

    //   this.initLoading()
    //   this.isLoading = true;
    //   (this.lastDocument ? this.postRef.orderBy('createdAt', 'desc').startAfter(this.lastDocument).limit(limit) : this.postRef.orderBy('createdAt', 'desc').limit(limit)).get()
    //     .then(snapshot => {
    //       this.isLoading = false
    //       this.loadingComponent.close()
    //       this.showMoreButton = !(snapshot.docs.length < limit)
    //       // continue only if we have any documents
    //       if (snapshot.docs.length == 0) {
    //         return
    //       }
    //       snapshot.forEach(doc => {
    //         console.log('doc', doc)
    //         let tmp = doc.data()
    //         tmp.id = doc.id
    //         this.posts.push(tmp)
    //       })
    //       this.lastDocument = snapshot.docs[snapshot.docs.length - 1]
    //     }).catch(err => {
    //       console.log('Error getting documents', err)
    //     })
    // }
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
