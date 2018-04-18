<template>
  <div class="columns is-centered">
    <div class="column is-2">
      <img
        :src="require('@/assets/avatar/1.jpg')"
        class="profile-picture">
    </div>
    <div class="column is-4">
      <p>Namn: Kalle</p>
      <p>Webbdesigner</p>
    </div>
    <div class="column is-1">
      <b-field
        grouped
        group-multiline>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Github</b-tag>
            <b-tag type="is-info"><b-icon
              icon="github-circle"/></b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">Twitter</b-tag>
            <b-tag type="is-info"><b-icon
              icon="twitter-circle"/></b-tag>
          </b-taglist>
        </div>
        <div class="control">
          <b-taglist attached>
            <b-tag type="is-dark">LinkedIn</b-tag>
            <b-tag type="is-info"><b-icon
              icon="linkedin-box"/></b-tag>
          </b-taglist>
        </div>

      </b-field>
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

<style>
  .profile-picture {
    width: 200px;
    border: 1px solid #000;
  }
</style>
