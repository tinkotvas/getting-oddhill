<template>
  <section>

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
        @click="addPost(heading, (editor.getValue()), topics, promoted)">Add New Post</button>
      <b-switch v-model="promoted">
        Promoted
      </b-switch>
    </p>
  </section>
</template>

<script>
import { db, storage } from '../../main.js'

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
var _ = require('lodash')

const uuidv1 = require('uuid/v1')
const fileRegex = /\.[^.\s]+$/i

export default {
  data () {
    return {
      heading: '',
      message: '',
      topics: [],
      promoted: false,
      editor: {},
      temp: {}
    }
  },
  mounted () {
    this.editor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg',
      previewStyle: 'vertical',
      usageStatistics: 'false',
      minHeight: '300px',
      height: 'auto',
      exts: ['scrollSync', 'colorSyntax', 'uml', 'chart', 'mark', 'table', 'taskCounter'],
      useCommandShortcut: true,
      hooks: {
        'addImageBlobHook': (file, callback) => {
          console.log(file)
          var uploadedImageURL = this.uploadImage(file, callback)
        }
      }
    })
    Object.assign(this.temp, this.editor)
  },
  methods: {
    difference (object, base) {
      function changes (object, base) {
        return _.transform(object, function (result, value, key) {
          if (!_.isEqual(value, base[key])) {
            result[key] = (_.isObject(value) && _.isObject(base[key])) ? changes(value, base[key]) : value
          }
        })
      }
      return changes(object, base)
    },
    addPost (heading, message, topics, promoted) { // <-- and here
      const createdAt = new Date()
      this.$store.dispatch('addPost', { createdAt, heading, message, topics, promoted, vm: this })
    },
    uploadImage (file, callback) {
      this.$store.dispatch('addImageToCache', { file, callback })
      console.log(this.difference(this.editor, this.temp))

      // let fileEnding = fileRegex.exec(file.name)
      // storage.ref().child('images/' + this.$store.getters.currentUser.id + '/' + uuidv1() + ((fileEnding && fileEnding[0]) ? fileEnding[0] : ''))
      //   .put(file)
      //   .then((snapshot) => {
      //     callback(snapshot.downloadURL, '')
      //   })
    }
  }
}

</script>

<style scoped>

</style>
