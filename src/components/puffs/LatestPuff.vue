<template>
  <div
    class="content"
    ref="latestpuff">
    <h3>LatestPuff</h3>
    <p v-for="(post, key) of latestPosts" :key="key">
      <router-link :to="`/post/${post.id}`">{{ post.heading }}</router-link>
    </p>
  </div>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      isLoading: false,
      postRef: db.collection('posts'),
      latestPosts: []
    }
  },
  mounted () {
    this.loadingComponent = this.$loading.open({
      container: this.isFullPage ? null : this.$refs.latestpuff
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
