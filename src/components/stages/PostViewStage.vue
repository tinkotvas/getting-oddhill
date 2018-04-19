<template>
  <!-- {{ this.$parent.$options.methods.initLoading(this) }} -->
  <vue-markdown class="content">{{ post.message }}</vue-markdown>
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
