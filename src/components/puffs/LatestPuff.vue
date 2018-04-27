<template>
  <div class="content">
    <h3>Latest posts</h3>
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
  props: ['posts'],
  computed: {
    latestPosts () {
      return this.posts.slice(0, 5)
    }
  }
}
</script>

<style scoped lang="scss">
.notification{
  padding:1.25rem;
  min-height:100px;
}
</style>
