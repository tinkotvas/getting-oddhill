<template>
  <div
    v-if="post.message"
    class="media">
    <!-- {{ this.$parent.$options.methods.initLoading(this) }} -->
    <vue-markdown class="media-content">{{ post.message }}</vue-markdown>
  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['post']
}

</script>

<style scoped lang="scss">

</style>
