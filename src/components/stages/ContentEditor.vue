<template>
  <div class="column">
    <b-field v-if="wysiwyg">
      <b-input
        v-model="heading"
        placeholder="Add a heading"/>
    </b-field>

    <b-field
      v-if="!wysiwyg">
      <b-input
        v-model="message"
        maxlength="5000"
        type="textarea"
        :has-counter="false"
        placeholder="Add content"/>
    </b-field>

    <b-field v-if="wysiwyg">
      <wysiwyg-editor
        :message="message"
        ref="editorMessage"/>
    </b-field>

    <b-field>
      <b-taginput
        v-model="topics"
        icon="label"
        placeholder="Add a topic"/>
    </b-field>

    <p class="level is-mobile">
      <button
        class="button"
        @click="addPost(heading, (wysiwyg ? $refs.editorMessage.editor.getValue() : message), topics, promoted)">Add Post</button>
      <b-switch v-model="promoted">
        Promoted
      </b-switch>
      <b-switch v-model="wysiwyg">
        Rich Editor
      </b-switch>
    </p>
  </div>
</template>

<script>
import WysiwygEditor from './WysiwygEditor'

export default {
  components: {
    WysiwygEditor
  },
  data () {
    return {
      heading: '',
      message: '',
      topics: [],
      promoted: false,
      wysiwyg: false
    }
  },
  computed: {
    imageCache: function () {
      return this.$store.getters.imageCache
    }
  },
  watch: {
    wysiwyg: function () {
      if (!this.wysiwyg) {
        this.message = this.$refs.editorMessage.editor.getValue()
      }
    },
    topics: function () {
      console.log(this.topics)
    }
  },
  methods: {
    addPost (heading, message, topics, promoted) {
      const createdAt = new Date()
      for (let image in this.imageCache) {
        if (!this.imageCache[image].storagePath) {
          console.log('All images not yet uploaded PLACEHOLDER')
          return
        }
        message = message.replace(this.imageCache[image].blobPath, this.imageCache[image].storagePath)
      }
      this.$store.dispatch('addPost', { createdAt, heading, message, topics, promoted, vm: this })
    }
  }
}

</script>

<style scoped lang="scss">
.column{
  max-width: 1000px;
}
</style>
