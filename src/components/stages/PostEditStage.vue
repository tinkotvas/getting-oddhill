<template>
  <section v-if="post">
    <b-field
      v-if="post.author"
      label="Author">
      <b-input
        disabled
        v-model="post.author.username"/>
    </b-field>

    <b-field label="Heading">
      <b-input v-model="post.heading"/>
    </b-field>

    <b-field label="Topics">
      <b-taginput
        v-model="post.topics"
        :data="filteredTopics"
        field="user.first_name"
        icon="label"
        placeholder="Add a topic"
        @typing="getFilteredTopics"/>
    </b-field>

    <b-field label="Message">
      <div
        id="editSection"
        type="textarea"/>

    </b-field>
    <p class="level">
      <button
        class="button"
        @click="editPost(post.heading, (editor.getValue()), post.topics, post.promoted)">Save changes</button>

      <b-switch v-model="post.promoted">
        Promoted
      </b-switch>
    </p>
    <nav class="level">
      <div class="level-item has-text-centered"/>
      <b-message
        v-if="saveStatus === 'saved'"
        class="level-item"
        type="is-success"
        has-icon>
        Changes were saved!
        <router-link :to="`/post/${this.$route.params.id}`">Go to post</router-link>
      </b-message>
      <b-message
        v-if="saveStatus === 'nochange'"
        class="level-item"
        type="is-warning"
        has-icon>
        No changes were made
      </b-message>
      <div class="level-item has-text-centered"/>
    </nav>
  </section>
</template>

<script>
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

import { storage } from '../../main.js'

export default {
  props: ['post'],
  data () {
    return {
      filteredTopics: [],
      isTrue: true,
      editor: {},
      initialValues: {},
      saveStatus: false
    }
  },
  computed: {
    topics: function () {
      return this.$store.getters.topics
    },
    imageCache: function () {
      return this.$store.getters.imageCache
    }
  },
  watch: {
    post: function () {
      this.editor.setValue(this.post.message)
      this.setInitialValues()
    }
  },
  mounted () {
    this.$store.dispatch('getTopics')
    this.initEditor()
    this.setInitialValues()
  },
  destroyed () {
    this.$store.dispatch('clearImageCache')
  },
  methods: {
    getFilteredTopics (text) {
      this.filteredTopics = this.topics.filter((option) => {
        return option
          .toString()
          .toLowerCase()
          .indexOf(text.toLowerCase()) >= 0
      })
    },
    setInitialValues () {
      if (Object.keys(this.post).length === 0) return
      this.initialValues = Object.assign({}, this.post)
      this.initialValues = Object.assign(this.initialValues, { message: this.editor.getValue(), topics: this.post.topics.slice() })
    },
    editPost (heading, message, topics, promoted) { // <-- and here
      const editedAt = new Date()
      let payload = {heading, message, topics, promoted}

      for (let attr in payload) {
        if (payload[attr] === this.initialValues[attr]) {
          delete payload[attr]
        }
      }

      if (Object.keys(payload).length > 0) {
        for (let image in this.imageCache) {
          if (!this.imageCache[image].storagePath) {
            console.log('All images not yet uploaded PLACEHOLDER')
            return
          }
          payload.message = payload.message.replace(this.imageCache[image].blobPath, this.imageCache[image].storagePath)
        }
        Object.assign(payload, { editedAt, id: this.$route.params.id })
        this.$store.dispatch('editPost', payload)
        this.saveStatus = 'saved'
      } else {
        this.saveStatus = 'nochange'
      }
    },
    uploadImage (file, callback) {
      storage.ref().child('images/' + file.name)
        .put(file)
        .then((snapshot) => {
          callback(snapshot.downloadURL, '')
        })
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
        useCommandShortcut: true,
        initialValue: this.post.message,
        hooks: {
          'addImageBlobHook': (file, callback) => {
            this.$store.dispatch('addImageToCache', { file, callback })
          }
        }
      })
    }
  }
}
</script>

<style scoped>
.message{
  max-width:400px;
}

</style>
