<template>
  <div class="columns is-centered">
    <div class="column is-10-widescreen">
      <div class="columns is-multiline is-mobile">
        <div class="column is-12-mobile is-6-tablet is-3-desktop"
          v-for="(profile, index) of profiles" :key="index">
          <div>
            <div class="box profile-box">
              <div class="image">
                <img
                  :src="require('@/assets/avatar/' + profile.picture)"
                  class="profile-picture">
              </div>
              <div class="media-content">
                <div class="content">
                  <p class="has-text-centered top-space"><strong>{{ profile.name }}</strong></p>
                  <p class="has-text-centered"><small>{{ profile.title }}</small></p>
                  <div class="block icons has-text-centered">
                    <b-icon icon="github-circle"></b-icon>
                    <b-icon icon="twitter-circle"></b-icon>
                    <b-icon icon="linkedin"></b-icon>
                </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
const json = require('../../assets/json/profiles.json')

export default {
  data () {
    return {
      profiles: json.profiles
    }
  }
}
</script>

<style scoped>
.image img {
  border: 5px solid rgba(247, 247, 247, 0.856);
  border-radius: 50%;
  display: block;
}

.top-space {
  padding-top: 10px;
}

.profile-box {
  background-color: #fff;
}
</style>
