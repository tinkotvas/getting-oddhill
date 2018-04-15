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
            <small>{{post.author}}</small>
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
        @click="deletePost(post.id)"/>
    </article>
  </b-notification>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      postRef: db.collection('posts'),
      promotedPosts: []
    }
  },
  mounted () {
    const loadingComponent = this.$loading.open({
      container: this.isFullPage ? null : this.$refs.postsstage.$el
    })

    this.$bind('promotedPosts', this.postRef.orderBy('createdAt', 'desc'))
      .then((doc) => {
        loadingComponent.close()
      })
      .catch((error) => {
        console.log('error in loading: ', error)
      })
  },
  methods: {
    deletePost (id) {
      this.postRef.doc(id).delete()
    }
  }
  // ,
  // firestore () {
  //   return {
  //     promotedPosts: db.collection('posts').orderBy('createdAt')
  //     }
  //   }
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
