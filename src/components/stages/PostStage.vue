<template>
  <!-- Since vue-markdown -->
  <div>
    <div class="field is-grouped is-grouped-centered">
      <p class="control">
        <router-link
          class="button edit-btn"
          :to="`/post/edit/${$route.params.id}`">edit post</router-link>
      </p>
      <p class="control">
        <a
          class="button delete-btn"
          @click="deletePost($route.params.id)">delete post</a>
      </p>
    </div>
    <p class="post-header"><strong>{{ post.heading }}</strong></p>
    <vue-markdown

      :source="post.message"
      class="content"/>

  </div>
</template>

<script>
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  props: ['post'],
  methods: {
    deletePost (id) {
      this.$store.dispatch('deletePost', { id })
      this.$router.push(`/`)
    }
  }
}

</script scoped>

<style scoped lang="scss">
.post-header {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
}

.edit-btn {
  font: Helvetica,Arial,sans-serif;
  font-size: 12px;
  color: #fff;
  display: inline-block;
  border-radius: 30px;
  font-weight: 500;
  min-width: 150px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 35px;
  text-decoration: none;
  cursor: pointer;
  justify-content: center;
}

.delete-btn {
  background-color: #FF0047;
  font: Helvetica,Arial,sans-serif;
  font-size: 12px;
  color: #000;
  display: inline-block;
  border-radius: 30px;
  font-weight: 500;
  min-width: 150px;
  padding-left: 40px;
  padding-right: 40px;
  padding-top: 15px;
  padding-bottom: 35px;
  text-decoration: none;
  cursor: pointer;
  justify-content: center;
}
</style>
