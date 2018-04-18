<template>
  <div v-if="post.heading" class="media">
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
  props: ['post'],
  mounted () {
    this.$parent.$options.methods.initLoading(this)
  },
  methods: {
    initLoading: function (vm) {
      vm.loadingComponent = this.$loading.open({
        container: vm.$refs.poststage.$el
      })
    }
  }
}

</script>

<style scoped lang="scss">

</style>
