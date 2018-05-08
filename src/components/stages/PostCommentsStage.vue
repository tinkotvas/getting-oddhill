<template>
    <div>
        <article class="media">

            <div class="media-content">
                <div class="field">
                    <p class="control">
                        <textarea class="textarea" placeholder="Add a comment..."></textarea>
                    </p>
                </div>
                <nav class="level">
                    <div class="level-left">
                        <div class="level-item">
                            <a class="button is-info">Submit</a>
                        </div>
                    </div>
                    <div class="level-right">
                    <div class="level-item">
                        <label class="checkbox">
                        <input type="checkbox"> Press enter to submit
                        </label>
                    </div>
                    </div>
                </nav>
            </div>
        </article>
        <article v-if="comments" v-for="(comment, key) of comments" :key="key">
            {{comment}}
        </article>

    </div>

</template>

<script>
export default {
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
      addComment(){


          //this.$store.dispatch('addComment', { createdAt: new Date(), })

      }
  }
}

</script>

<style>

</style>