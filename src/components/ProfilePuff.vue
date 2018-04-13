<template>
  <div class="column">
    <h1>ProfilePuff</h1>
    <!-- <img src="../assets/1.jpg"> -->
    <div v-for="(profile, key) of profiles" :key = "key">
      <img :src="require('@/assets/avatar/' + profile.picture)" alt="Avatar"/>
      <a href="#">{{ profile.name }}</a>

    </div>
  </div>
</template>

<script>
const json = require('../assets/json/profiles.json')
// Object.entries(json.profiles).forEach(([key, profile]) => {profile.picture = '../assets/' + profile.picture})

export default {
  name: 'ProfilePuff',
  data () {
    return {
      profiles: json.profiles
    }
  }
}
</script>

<style>

</style>
