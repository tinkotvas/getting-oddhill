<template>
    <div class="col-12 border">
        <div v-for="post in promotedPosts" :key="post">
            <p>{{post.message}}</p>
        </div>
    </div>
</template>

<script>
const json = require('../assets/json/posts.json')
console.log(json)

export default {
  name: 'PromotedStage',
  data () {
    return {
      promotedPosts: json.posts
    }
  }
}
</script>

<style>

</style>