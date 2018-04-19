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
      <!-- <b-input
        v-model="message"
        maxlength="5000"
        type="textarea"/> -->
      <div id="editSection"/>
    </b-field>
    <p class="level">
      <button
        class="button"
        @click="addPost(author, heading, (editor.getValue()), topics, promoted)">Add New Post</button>
      <b-switch v-model="promoted">
        Promoted
      </b-switch>
    </p>
    <button
      class="button"
      @click="boom()">BRUR</button>
  </section>
</template>

<script>
import { db } from '../../main.js'

require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css') // editor ui
require('tui-editor/dist/tui-editor-contents.css') // editor content
require('highlight.js/styles/github.css') // code block highlight

var Editor = require('tui-editor')

export default {
  data () {
    return {
      author: '',
      heading: '',
      message: '',
      topics: [],
      promoted: false,
      editor: {}
    }
  },
  mounted () {
    this.editor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      usageStatistics: 'false'
    })
  },
  methods: {
    addPost (author, heading, message, topics, promoted) { // <-- and here
      const createdAt = new Date()
      db.collection('posts').add({ author, createdAt, heading, message, topics, promoted })
      let url = promoted ? '/' : '/posts'
      this.$router.push(url)
    },
    boom () {
      console.log(this.editor.getValue())
    }
  }
}

</script>

<style scoped>
.no-overflow {
  overflow: initial;
}
</style>
