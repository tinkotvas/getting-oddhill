<template>
  <div id="App">
    <div
      class="section"
      v-if="userData">
      <div class="container">
        <profile-page-stage
          :user-data="currentUser.profileData"/>
      </div>
    </div>
    <div
      class="section"
      v-if="userData">
      <div class="container">
        <profile-post-puff :posts="userData.posts"/>
      </div>
    </div>
  </div>
</template>

<script>

import { db } from '../../main.js'
// Stages
import ProfilePageStage from '../stages/ProfilePageStage'
// Puffs
import ProfilePostPuff from '../puffs/ProfilePostPuff'

export default {
  components: {
    ProfilePageStage,
    ProfilePostPuff
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    userData () {
      return this.$store.getters.profileData
    }
  }
}

</script>

<style>

</style>
