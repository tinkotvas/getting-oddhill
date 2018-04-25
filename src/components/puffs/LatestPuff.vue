<template>
  <b-notification
    class="content"
    :closable="false"
    ref="latestpuff">
    <h3>LatestPuff</h3>

    <p
      v-for="(post, key) of latestPosts"
      :key="key">

      <a href="#">{{ post.heading }}</a>

    </p>

  </b-notification>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      isLoading: false
    }
  },
  computed: {
    latestPosts: function() {
      return (this.$store.getters.posts).slice(0,5)
    }
  },
  watch: {
    latestPosts: function(){
      this.loadingComponent.close()
    }
  },
  mounted () {
    this.loadingComponent = this.$loading.open({
      container: this.isFullPage ? null : this.$refs.latestpuff.$el
    })
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
