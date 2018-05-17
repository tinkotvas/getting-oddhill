<template>
  <div>
    <div class="columns is-centered content">
      <div class="column is-2 box profile-box is-2-widescreen">
        <div class="image overlay">
          <img
            :src="require('@/assets/avatar/wind.jpg')"
            class="profile-picture">
        </div>
        <section class="info">
          <p><strong>Namn : </strong>
            {{ userData.username }}</p>
          <p><strong>Title : </strong>{{ userData.title }}</p>
          <p><strong>Språk : </strong>..</p>
          <p><strong>Verktyg : </strong>...</p>
          <p><strong>Framework : </strong>...</p>
        </section>
        <b-field
          class="top-space"
          grouped
          group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">Github</b-tag>
              <b-tag type="is-info"><b-icon
                icon="github-face"/></b-tag>
            </b-taglist>
          </div>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">Twitter</b-tag>
              <b-tag type="is-info"><b-icon
                icon="twitter"/></b-tag>
            </b-taglist>
          </div>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">LinkedIn</b-tag>
              <b-tag type="is-info"><b-icon
                icon="linkedin"/></b-tag>
            </b-taglist>
          </div>
        </b-field>
      </div>
      <div class="column is-7">
        <div class="column is-6 is-centered">
          <h4>Om {{ userData.username }}</h4>
          <p>{{ userData.bio }}</p>
        </div>

      </div>
      <div class="column is-3">
        <div
          ref="latestpuff"
          class="load-overlay box profile-box">
          <latest-puff :posts="posts"/>
        </div>
        <topics-puff class="box profile-box"/>

      </div>
    </div>
    <div class="columns is-centered">
      <div class="column"/>
    </div>
  </div>
</template>

<script>
const json = require('../../assets/json/profiles.json')

import LatestPuff from '../puffs/LatestPuff'
import TopicsPuff from '../puffs/TopicsPuff'

export default {
  components: {
    LatestPuff,
    TopicsPuff
  },
  props: ['userData'],
  data () {
    return {
      profiles: json.profiles
    }
  },
  computed: {
    posts () {
      return this.$store.getters.posts
    }
  },
  watch: {
    posts: function () {
      this.load.forEach(el => {
        el.close()
      })
    }
  },
  mounted: function () {
    this.getPosts()
    this.initLoadingOverlay()
  },
  methods: {
    getPosts () {
      this.$store.dispatch('getPostsRealtime')
    },
    initLoadingOverlay () {
      this.load = this.$plugins.load(this, [this.$refs.promoted,
        this.$refs.latestpuff])
    }
  }

}

</script>

<style>
  .profile-picture {
    width: 200px;
    border-radius: 50%;
  }

  .profile-box {
  background-color: rgba(152, 226, 248, 0.212);
  }

  .top-space{
    margin-top: 15px;
  }

  .info {
    margin-top: 10px;
  }
</style>
