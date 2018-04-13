<template>
  <!-- <div id="create-post">
    <form @submit="addPost(author, heading, message, topics)">
        <input v-model="author" placeholder="Author">
        <input v-model="heading" placeholder="Heading">
        <input v-model="message" placeholder="Message">
        <input v-model="topics" placeholder="Topics">
        <button type="submit">Add New Post</button>
    </form>
  </div> -->

      <section>
        <b-field label="author">
            <b-input v-model="author"></b-input>
        </b-field>

        <b-field label="heading">
            <b-input v-model="heading"></b-input>
        </b-field>

        <b-field label="topics">
            <b-taginput
                v-model="topics"
                icon="label"
                placeholder="Add a topic">
            </b-taginput>
        </b-field>


        <b-field label="message">
            <b-input v-model="message" maxlength="5000" type="textarea"></b-input>
        </b-field>
        <p class="control">
            <button class="button" @click="addPost(author, heading, message, topics)">Add New Post</button>
            
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
        topics: []
    }
  },
  methods: { 
    addPost (author, heading, message, topics) {      // <-- and here 
      const createdAt = new Date()
      db.collection('posts').add({ author, createdAt, heading, message, topics })
      this.$router.push('/posts')
    }
  }
}

</script>

<style scoped>
.no-overflow {
  overflow: initial;
}
</style>
