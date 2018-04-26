<template>
  <section v-if="post">
    <b-field v-if="post.author" label="Author">
      <b-input v-model="post.author.username"/>
    </b-field>

    <b-field label="Heading">
      <b-input v-model="post.heading"/>
    </b-field>

    <b-field label="Topics">
      <b-taginput
        v-model="post.topics"
        icon="label"
        placeholder="Add a topic"/>
    </b-field>

    <b-field label="Message">
      <div
        id="editSection"
        type="textarea"/>

    </b-field>
    <p class="level">
      <button
        class="button"
        @click="editPost(post.author, post.heading, (editor.getValue()), post.topics, post.promoted)">Save changes</button>
      <b-switch v-model="post.promoted">
        Promoted
      </b-switch>
    </p>
  </section>
</template>

<script>
import { db } from '../../main.js'

require('codemirror/lib/codemirror.css') // codemirror
require('tui-editor/dist/tui-editor.css') // editor ui
require('tui-editor/dist/tui-editor-contents.css') // editor content
require('tui-color-picker/dist/tui-color-picker.css') // color picker
require('tui-chart/dist/tui-chart.css') // chart
require('highlight.js/styles/github.css') // code block highlight
var Editor = require('tui-editor')
require('tui-editor/dist/tui-editor-extUML.js') // extensions
require('tui-editor/dist/tui-editor-extChart.js')
require('tui-editor/dist/tui-editor-extTable.js')
require('tui-editor/dist/tui-editor-extColorSyntax.js')
require('tui-editor/dist/tui-editor-extScrollSync.js')

export default {
  data () {
    return {
      promoted: false,
      editor: {},
      initialValues: {}
    }
  },
  computed: {
    post () {
      return this.$store.getters.post
    }
  },
  watch: {
    post: function () {
      this.setInitialValues()
    }
  },
  mounted () {
    this.initEditor()
    this.getPost()
  },
  methods: {
    getPost: function () {
      if (this.$store.getters.post.id == this.$route.params.id) {
        this.setInitialValues()
      } else {
        this.$store.dispatch('getPostRealtime', {
          id: this.$route.params.id
        })
      }
    },
    setInitialValues () {
      this.editor.setValue(this.post.message)
      this.initialValues = Object.assign({}, this.post)
      this.initialValues = Object.assign(this.initialValues, {message: this.editor.getValue()})
    },
    editPost (author, heading, message, topics, promoted) { // <-- and here
      const editedAt = new Date()
      let payload = {author, heading, message, topics, promoted}

      for (let attr in payload) {
        if (payload[attr] === this.initialValues[attr]) {
          delete payload[attr]
        }
      }
      if (Object.keys(payload).length > 0) {
        this.$store.dispatch('editPost', { author, editedAt, heading, message, topics, promoted, id: this.$route.params.id })
        this.$router.push(`/post/${this.$route.params.id}`)
      }
    },
    initEditor () {
      this.editor = new Editor({
        el: document.querySelector('#editSection'),
        initialEditType: 'wysiwyg',
        previewStyle: 'vertical',
        usageStatistics: 'false',
        minHeight: '300px',
        height: 'auto',
        exts: ['scrollSync', 'colorSyntax', 'uml', 'chart', 'mark', 'table', 'taskCounter'],
        useCommandShortcut: true
      })
    }
  }
}
</script>

<style scoped>
.no-overflow {
  overflow: initial;
}
</style>
