<template>
  <div class="column">
    <h1>ProfilePuff</h1>
    <img src="../assets/1.jpg">
    <div v-for="(name, key) of profiles" :key = "key">
      <a href="#">{{ name.name }}</a>

    </div>
  </div>
</template>

<script>
const json = require('../assets/json/profiles.json')

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
