<template>
  <b-notification
    ref="poststage"
    id="poststage"
    :closable="false">
    <div
      v-if="post.heading"
      class="columns is-centerered no-overflow">
      <div class="column is-10">
        <article class="media">
          <div class="media-content">
            <div class="content">
              <p>
                <strong>{{ post.heading }}</strong> <small>@{{ post.author }}</small>
                <br><br>
                {{ this.renderWYSIWYG(post.message) }}
              </p>
            </div>
          </div>
        </article>
      </div>
    </div>
  </b-notification>
</template>

<script>
import { db } from '../../main.js'

const Viewer = require('tui-editor/dist/tui-editor-Viewer')

export default {
  data () {
    return {
      isLoading: true,
      post: []
    }
  },
  mounted () {
    this.initLoading()
    this.bindPost()
  },
  methods: {
    bindPost: function () {
      this.$bind('post', db.collection('posts').doc(this.$route.params.id))
        .then((doc) => {
          this.isLoading = false
          this.loadingComponent.close()
        })
        .catch((error) => {
          console.log('error in loading: ', error)
        })
    },
    initLoading () {
      this.loadingComponent = this.$loading.open({
        container: this.$refs.poststage.$el
      })
    },
    renderWYSIWYG(content){
        this.editor = new Viewer({
            el: document.querySelector('#poststage'),
            height: '500px',
            initialValue: content
        });        
    }
  }
}

</script>

<style scoped lang="scss">
.no-overflow {
  overflow: hidden;
}
.notification{
  padding:1.25rem;
  min-height:100px;
}
</style>
