<template>
  <div
    class="container"
    ref="latestpuff">
    <h3>LatestPuff</h3>
    <p
      v-for="(post, key) of latestPosts"
      :key="key">
      <router-link :to="`/post/${post.id}`">{{ post.heading }}</router-link>
    </p>
  </div>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    latestPosts: function () {
      return this.$store.getters.posts
    }
  },
  watch: {
    latestPosts: function () {
      this.load.close()
    }
  },
  mounted () {
    this.load = this.$x.load(this, this.$refs.latestpuff)
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
