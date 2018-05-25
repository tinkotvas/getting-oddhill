<template>
  <div>
    <div class="container columns content is-centered">
      <div class="column is-2 is-2-widescreen">
        <div class="image">
          <img
            :src="userData.profilePhoto"
            class="profile-picture">
        </div>
        <section class="info">
          <p><strong><small>Namn : </small></strong>
            {{ userData.username }}</p>
          <p><strong><small>Title : </small></strong>{{ userData.title }}</p>
          <!-- <p><strong>Språk : </strong>..</p>
          <p><strong>Verktyg : </strong>...</p>
          <p><strong>Framework : </strong>...</p> -->
        </section>
        <div class="block icons">
          <b-icon icon="github-circle"/>
          <b-icon icon="linkedin"/>
          <b-icon icon="twitter-circle"/>
        </div>
        <router-link
          class="button is-small is-outlined is-primary"
          :to="'/profile/edit/' + userData.id">Edit profile
        </router-link>
      </div>
      <div class="column is-6 is-centered">
        <h4>Om {{ userData.username }}</h4>
        <div><p class="bio-box">{{ userData.bio }}</p></div>
      </div>

      <!-- <div class="column is-3">
        <div
          ref="latestpuff"
          class="load-overlay box profile-box">
          <latest-puff :posts="posts"/>
        </div>
        <topics-puff class="box profile-box"/>

      </div> -->
    </div>
    <div class="columns is-centered">
      <div class="column"/>
    </div>
  </div>
</template>

<script>
const json = require('../../assets/json/profiles.json')

// Puffs
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

<style scoped>
  .profile-picture {
    width: 200px;
    border-radius: 50%;
  }

  .profile-box {
    background-color: #fff;
  }

  .top-space{
    margin-top: 15px;
  }

  .info {
    margin-top: 10px;

  }

  .bio-box {

  }

  .icons {
    margin-top: 20px;
  }
</style>
