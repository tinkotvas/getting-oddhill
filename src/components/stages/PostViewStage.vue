<template>
  <b-notification
    ref="poststage"
    :closable="false">
    <div
      v-if="post.heading"
      class="columns is-centerered no-overflow">
      <div class="column is-10">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ post.heading }}</strong> <small>@{{ post.author }}</small>
                <br><br>
                {{ post.message }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </b-notification>
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
.no-overflow {
  overflow: hidden;
}
.notification{
  padding:1.25rem;
  min-height:100px;
}
</style>
