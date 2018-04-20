<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <div
        class="content"
        :closable="false"
        ref="ProfilePostPuff">
        <h3><strong>Inlägg av Batman</strong></h3>
        <div class="columns is-multiline">
          <div  class="column is-6"
            v-if="posts"
            v-for="(post, key) in posts"
            :key="key">
            <div class="box">
              <span v-if="post.message">
                <strong>{{ post.heading }}</strong>
                <br><span>{{ localTimeSv(post.createdAt) }}</span>
                <br>{{ post.message | truncate }}
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

export default {
  filters: {
    truncate: function (value) {
      return value.substring(0, 300) + '...'
    }
  },
  props: ['posts'],
  methods: {
    localTimeSv: function (value) {
      let date = this.$moment(value)
      return date.locale('sv').format('dddd, MMMM Do YYYY')
    }
  },
  mounted: {
    postsData () {
      console.log(this.posts)
    }
  }
}

</script>

<style>

</style>
