<template>
  <b-notification class="content" :closable="false" ref="latestpuff">
      <h1>LatestPuff</h1>
      
      <p v-for="(post, key) of latestPosts" :key="key">

          {{ post.heading }}

      </p>
    
  </b-notification>
</template>

<script>
import { db } from '../../main.js'

export default {
  data(){
      return {
        isLoading: false,
        postRef: db.collection('posts'),
        latestPosts: []
      }
  },
  mounted(){
    const loadingComponent = this.$loading.open({
      container: this.isFullPage ? null : this.$refs.latestpuff.$el
    })

    this.$bind('latestPosts', this.postRef.orderBy('createdAt', 'desc').limit(5))
    .then((doc) => {
      loadingComponent.close()
    })
    .catch((error) => {
      console.log('error in loading: ', error)
    })
  }
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






