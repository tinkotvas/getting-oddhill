<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <div
        class="content"
        ref="ProfilePostPuff">
        <h3><strong>Inlägg av Batman</strong></h3>
        <div class="columns is-multiline">
          <div
            class="column is-6"
            v-if="postsData.length > 0"
            v-for="(post, key) in postsData"
            :key="key">
            <div class="box">
              <span v-if="post.message">
                <strong>{{ post.heading }}</strong>
                <br><span><small>{{ localTimeSv(post.createdAt.toDate()) }}</small></span>
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
import { db } from '../../main.js'

export default {
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
      return date.locale('sv').format('dddd, MMMM Do YYYY')
    },
    getPostsData () {
      let currentUser = this.$store.getters.currentUser
      if (!currentUser) return []
      this.postsData = db.collection('posts').where('author', '==', db.doc('users/' + currentUser.id)).orderBy('createdAt').get().then((data) => {
        console.log(data)
        this.postsData = data.docs.map((doc) => doc.data())
      })
    }
  }
}

</script>

<style>

</style>
