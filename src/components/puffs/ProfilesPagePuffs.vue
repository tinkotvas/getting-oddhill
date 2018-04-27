<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <div class="columns is-multiline">
        <div class="column is-3"
          v-for="(profile, index) of profiles" :key="index">
          <div>
            <div class="box">
              <div class="image">
                <img
                :src="require('@/assets/avatar/' + profile.picture)"
                class="profile-picture">
              </div>
              <div class="media-content">
                <div class="content">
                  <p class="has-text-centered top-space"><strong>{{ profile.name }}</strong></p>
                  <p class="has-text-centered"><small>{{ profile.title }}</small></p>
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
  data() {
    return {
      profiles: json.profiles
    }
  }
}
</script>

<style>
.image img {
  width: 100px;
  height: 100px;
  border-radius: 50%;
}

.top-space {
  padding-top: 10px;
}
</style>
