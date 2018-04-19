<template>
  <div
    v-if="post.heading"
    class="media">
    <!-- {{ this.$parent.$options.methods.initLoading(this) }} -->
    <div class="media-content">
      <p>
        <strong>{{ post.heading }}</strong> <small>@{{ post.author }}</small>
        <br><br>
        {{ post.message }}
      </p>
    </div>
  </div>
</template>

<script>

export default {
  props: ['post']
}

</script>

<style scoped lang="scss">

</style>
