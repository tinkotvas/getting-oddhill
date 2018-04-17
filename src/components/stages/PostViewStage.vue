<template>
    <b-notification ref="poststage" :closable="false">
        <div  v-if="post.heading" class="columns is-centerered no-overflow">
            <div class="column is-10">
                <article class="media">
                    <div class="media-content">
                        <div class="content">
                            <p>
                            <strong>{{post.heading}}</strong> <small>@{{post.author}}</small>
                            <br><br>
                            {{post.message}}
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
    bindPost: function(){
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
