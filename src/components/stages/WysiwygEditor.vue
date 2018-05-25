<template>
  <section>
    <div id="editSection"/>
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


export default {
  props: ['message'],
  data () {
    return {
      editor: {},
      wysiwyg: false
    }
  },
  computed: {
    imageCache: function () {
      return this.$store.getters.imageCache
    }
  },
  mounted () {
    this.editor = new Editor({
      el: document.querySelector('#editSection'),
      initialEditType: 'wysiwyg',
      initialValue: this.message,
      previewStyle: 'vertical',
      usageStatistics: 'false',
      minHeight: '300px',
      height: 'auto',
      exts: ['scrollSync', 'colorSyntax', 'uml', 'chart', 'mark', 'table', 'taskCounter'],
      useCommandShortcut: true,
      hooks: {
        'addImageBlobHook': (file, callback) => {
          this.$store.dispatch('addImageToCache', { file, callback })
        }
      }
    })
  },
  destroyed () {
    this.$store.dispatch('clearImageCache')
  }
}

</script>

<style lang="scss">

</style>
