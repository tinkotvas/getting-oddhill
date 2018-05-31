<template>
  <div>
    <article class="media">
      <div class="media-content">
        <div class="field">
          <p class="control">
            <textarea
              v-model="comment.body"
              class="textarea"
              placeholder="Add a comment..."/>
          </p>
        </div>
        <nav class="level">
          <div class="level-left">
            <div class="level-item">
              <a
                class="button post-btn"
                @click="addComment(this)">post comment</a>
            </div>
          </div>
          <div class="level-right">
            <div class="level-item"/>
          </div>
        </nav>
      </div>
    </article>
    <article
      v-if="comments"
      v-for="(comment, key) of comments"
      :key="key"
      class="media">
      <figure class="media-left">
        <p class="image is-64x64">
          <img src="https://bulma.io/images/placeholders/128x128.png">
        </p>
      </figure>
      <div class="media-content">
        <div class="content">
          <p>
            {{ comment.body }}
            <br>
            <!--<small><a>Reply</a></small>-->
          </p>
        </div>
      </div>
    </article>
  </div>
</template>

<script>
export default {
  props: ['comments'],
  data () {
    return {
      comment: {}
    }
  },
  methods: {
    addComment (d) {
      this.$store.dispatch('addComment', {
        createdAt: new Date(),
        body: this.comment.body,
        parent: this.comment.parent,
        postid: this.$route.params.id
      })
    }
  }
}

</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
.post-btn {
  @include btn;
}
</style>
