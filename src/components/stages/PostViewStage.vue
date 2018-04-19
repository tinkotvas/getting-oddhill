<template>
  <div
    v-if="post.heading"
    class="media">
    <!-- {{ this.$parent.$options.methods.initLoading(this) }} -->
    <vue-markdown class="media-content">{{post.message}}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  props: ['post'],
  components:{
    VueMarkdown
  }
}

</script>

<style scoped lang="scss">

</style>
