<template>
    <div class="col-12 border">
        <div v-for="post in promotedPosts" :key="post">
            <h1>{{post}}</h1>
        </div>
    </div>
</template>

<script>
const json = require('../assets/json/posts.json')

export default {
  name: 'PromotedStage',
  data: {
      promotedPosts: json
  }
}
</script>

<style>

</style>