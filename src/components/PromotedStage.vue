<template>
    <div class="col-12 border">
        <div v-for="(post, key) of promotedPosts" :key="key">
            <p>{{post}} {{key}}</p>
        </div>
    </div>
</template>

<script>
const json = require('../assets/json/posts.json')

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
