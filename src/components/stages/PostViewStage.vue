<template>
  <!-- Since vue-markdown -->
  <vue-markdown
    v-if="$route.params.id === post.id"
    class="content">{{ post.message }}</vue-markdown>
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
