<template>
  <div id="profile-edit">
    <section>
      <div class="container">
        <div class="columns">
          <div
            id="edit-stage"
            class="column">
            <profile-edit-stage/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { db } from '../../main.js'

// Stages
import ProfileEditStage from '../stages/ProfileEditStage'

// Puffs

export default {
  components: {
    ProfileEditStage
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

<style scoped>

</style>
