<template>
  <!-- Since vue-markdown -->
  <vue-markdown
    :source="post.message"
    class="content"/>
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
