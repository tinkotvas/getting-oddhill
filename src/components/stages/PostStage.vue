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

</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
.post-header {
  font-family: Arial, Helvetica, sans-serif;
  font-size: 24px;
}

.edit-btn {
  @include btn;
}

.delete-btn {
  @include btn;
  background-color: #FF0047;

}
</style>
