<template>
  <!-- Since vue-markdown -->
  <div>

    <span class="post-header-center"><h1>{{ post.heading }}</h1></span>
    <vue-markdown

      :source="post.message"
      class="content post-page-content"/>
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

<style lang="scss">
@import "../../styles/variables.scss";
.post-header-center h1 {
  text-align: center;
  margin-bottom: 20px;
}

.edit-btn {
  @include btn;
  margin-top: 10px;
  margin-bottom: 10px;
}

.delete-btn {
  @include btn;
  background-color: #FF0047;
  margin-top: 10px;
  margin-bottom: 10px;
}

.post-page-content {
  img {
    max-width: 50%;
    display: block;
    margin-top: 20px;
    margin-right: 25%;
    margin-left: 25%;
    margin-bottom: 20px;
    box-shadow: 0px 2px 40px #bac9dc;
  }

iframe {
    display: block;
    width: 100%;
    height: 400px;
    margin-top: 20px;
    margin-bottom: 20px;
    @media(max-width:599px) {
      height: 200px;
    }
  }
}


</style>
