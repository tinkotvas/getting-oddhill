<template>
    <div>
        <article class="media">
            <div class="media-content">
                <div class="field">
                    <p class="control">
                        <textarea v-model="comment.body" class="textarea" placeholder="Add a comment..."></textarea>
                    </p>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <a class="button is-info" @click="addComment(this)">Submit</a>
                        </div>
                    </div>
                    <div class="level-right">
                    <div class="level-item">
                    </div>
                    </div>
                </nav>
            </div>
        </article>
        <article v-if="comments" v-for="(comment, key) of comments" :key="key">
            {{comment.body}}
        </article>
    </div>
</template>

<script>
export default {
  data () {
    return {
      comment: {}
    }
  },
  props: ['comments'],
  computed: {
    //   sortedComments () {
    //       return this.comments.sort(function(a, b){
    //           return a[createdAt] - b[createdAt] || a[parent] - a[parent]
    //       })
    //   }
  },
  watch: {
    //   sortedComments (){
    //       console.log(this.sortedComments)
    //   }
  },
  methods: {
      addComment(d){
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

<style>

</style>