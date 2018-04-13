<template>
  <section>
    <b-field label="author">
      <b-input v-model="author"/>
    </b-field>

    <b-field label="heading">
      <b-input v-model="heading"/>
    </b-field>

    <b-field label="topics">
      <b-taginput
        v-model="topics"
        icon="label"
        placeholder="Add a topic"/>
    </b-field>

    <b-field label="message">
      <b-input
        v-model="message"
        maxlength="5000"
        type="textarea"/>
    </b-field>
    <p class="level">
      <button
        class="button"
        @click="addPost(author, heading, message, topics, promoted)">Add New Post</button>
      <b-switch v-model="promoted">
        Promoted
      </b-switch>
    </p>
  </section>
</template>

<script>
import { db } from '../main.js'

export default {
  data () {
    return {
      author: '',
      heading: '',
      message: '',
      topics: [],
      promoted: false
    }
  },
  methods: {
    addPost (author, heading, message, topics, promoted) { // <-- and here
      const createdAt = new Date()
      db.collection('posts').add({ author, createdAt, heading, message, topics, promoted })
      let url = promoted ? '/' : '/posts'
      this.$router.push(url)
    }
  }
}

</script>

<style scoped>
.no-overflow {
  overflow: initial;
}
</style>
