<template>
  <div class="columns is-centered">
    <div class="column is-12">
      <div
        class="content"
        ref="ProfilePostPuff">
        <h3><strong>Inlägg av Batman</strong></h3>
        <div class="columns is-multiline">
          <div
            class="column is-4 no-overflow"
            v-if="postsData.length > 0"
            v-for="(post, key) in postsData"
            :key="key">
            <div class="box">
              <span v-if="post.message">
                <strong>{{ post.heading }}</strong>
                <br><span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
                <br>
                <vue-markdown :source= "post.message | truncate"/>
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../main.js'
import VueMarkdown from 'vue-markdown'

export default {
  components: {
    VueMarkdown
  },
  filters: {
    truncate: function (value) {
      return value.substring(0, 300) + '...'
    }
  },
  props: ['posts'],
  data () {
    return {
      postsData: []
    }
  },
  mounted: function () {
    this.getPostsData()
  },
  methods: {
    localTimeSv: function (value) {
      let date = this.$moment(value)
      return date.locale('sv').format('LL')
    },
    getPostsData () {
      let currentUser = this.$store.getters.currentUser
      if (!currentUser) return []
      this.postsData = db.collection('posts').where('author', '==', db.doc('profiles/' + currentUser.id)).orderBy('createdAt').get().then((data) => {
        this.postsData = data.docs.map((doc) => doc.data())
      })
    }
  }
}

</script>

<style>

</style>
