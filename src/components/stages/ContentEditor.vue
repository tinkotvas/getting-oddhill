<template>
  <div class="column">
    <b-field label="Heading">
      <b-input v-model="heading"/>
    </b-field>

    <b-field label="Topics">
      <b-taginput
        v-model="topics"
        icon="label"
        placeholder="Add a topic"/>
    </b-field>

    <b-field
      v-if="!wysiwyg"
      label="Body">
      <b-input
        v-model="message"
        maxlength="5000"
        type="textarea"/>
    </b-field>

    <b-field v-if="wysiwyg"
      label="Body">
      <wysiwyg-editor
        :message="message"
        ref="editorMessage"/>
    </b-field>

    <p class="level">
      <button
        class="button"
        @click="addPost(heading, (wysiwyg ? $refs.editorMessage.editor.getValue() : message), topics, promoted)">Add New Post</button>
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
  methods: {
    addPost (heading, message, topics, promoted) { // <-- and here
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
