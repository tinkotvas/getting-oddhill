<template>
  <div id="App">
    <div class="section">
      <div class="container">
        <profiles-page-puffs/>
      </div>
    </div>
  </div>
</template>

<script>
import { db } from '../../main.js'
import ProfilesPagePuffs from '../puffs/ProfilesPagePuffs'

export default {
  components: {
    ProfilesPagePuffs
  }
  // computed: {
  //   currentUser () {
  //     return this.$store.getters.currentUser
  //   },
  //   userData () {
  //     return this.$store.getters.profileData
  //   }
  // }
}

</script>

<style>

</style>
