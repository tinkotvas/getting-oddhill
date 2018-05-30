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
        autocomplete
        v-model="topics"
        :data="filteredTopics"
        icon="label"
        placeholder="Add a topic"
        :allow-new="true"
        :rounded="true"
        @typing="getFilteredTopics"/>
    </b-field>

    <p class="level is-mobile">
      <button
        class="button add-post"
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
const youtubeRegex = /(?:http:|https:)?\/\/(?:www\.)?(?:youtube.com|youtu.be)\/(?:watch)?(?:\?v=)?(?:\S+)?/g

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
      wysiwyg: false,
      filteredTopics: []
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
    }
  },
  mounted () {
    this.$store.dispatch('getTopics')
  },
  methods: {
    getFilteredTopics (text) {
      this.filteredTopics = [text, ...this.$store.getters.filteredTopics(text).map((topic) => { return topic.topic })]
    },
    addPost (heading, message, topics, promoted) {
      const createdAt = new Date()
      for (let image in this.imageCache) {
        if (!this.imageCache[image].storagePath) {
          console.log('All images not yet uploaded PLACEHOLDER')
          return
        }

        message = message.replace(this.imageCache[image].blobPath, this.imageCache[image].storagePath)
      }

      if (youtubeRegex.test(message)) {
        message = this.replaceYouTubeUrls(message)
      }
      this.$store.dispatch('addPost', { createdAt, heading, message, topics, promoted, vm: this })
    },
    replaceYouTubeUrls (message) {
      let width = 560
      let height = 315
      let matchedUrls = message.match(youtubeRegex)

      matchedUrls.forEach((url) => {
        let videoId = this.getYouTubeId(url)

        var iframeMarkup = '<iframe width="' + width + '" height="' + height + '" src="//www.youtube.com/embed/' +
      videoId + '" frameborder="0" allowfullscreen></iframe>'

        message = message.replace(url, iframeMarkup)
      })
      return message
    },
    getYouTubeId (url) {
      var regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/
      var match = url.match(regExp)

      if (match && match[2].length == 11) {
        return match[2]
      } else {
        return 'error'
      }
    }
  }
}

</script>

<style scoped lang="scss">
@import "../../styles/variables.scss";
.column{
  max-width: 1000px;
}

.add-post {
  @include btn;
}
</style>
