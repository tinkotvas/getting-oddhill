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
        autocomplete
        v-model="post.topics"
        :data="filteredTopics"
        icon="label"
        :allow-new="true"
        placeholder="Add a topic"
        @typing="getFilteredTopics"/>
    </b-field>

    <b-field label="Message">
      <wysiwyg-editor
        :message="post.message"
        ref="editorMessage"/>

    </b-field>
    <p class="level">
      <button
        class="button save-btn"
        @click="editPost(post.heading, ($refs.editorMessage.editor.getValue()), post.topics, post.promoted)">Save changes</button>

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
import WysiwygEditor from './WysiwygEditor'

import { storage } from '../../main.js'

export default {
  components: {
    WysiwygEditor
  },
  props: ['post'],
  data () {
    return {
      filteredTopics: [],
      isTrue: true,
      initialValues: {},
      saveStatus: false
    }
  },
  computed: {
    topicsArray: function () {
      return Object.keys(this.topics)
    }
  },
  watch: {
    post: function () {
      this.$refs.editorMessage.editor.setValue(this.post.message)
      this.setInitialValues()
    }
  },
  mounted () {
    this.setInitialValues()
    this.$store.dispatch('getTopics')
  },
  destroyed () {
    this.$store.dispatch('clearImageCache')
  },
  methods: {
    getFilteredTopics (text) {
     this.filteredTopics = [text, ...this.$store.getters.filteredTopics(text).map((topic) => { return topic.topic })]
    },
    setInitialValues () {
      if (Object.keys(this.post).length === 0) return
      this.initialValues = Object.assign({}, this.post)
      this.initialValues = Object.assign(this.initialValues, { message: this.$refs.editorMessage.editor.getValue(), topics: this.post.topics.slice() })
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
    }
  }
}
</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
.box {
  background-color: #fff;
}

.message{
  max-width:400px;
}

.save-btn {
  @include btn;
}
</style>
