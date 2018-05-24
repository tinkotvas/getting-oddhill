<template>
  <section>
    <div class="columns content">
      <div class="column is-2 is-2-widescreen">
        <div id="profile-pic-puff">
          <profile-picture-puff/>
        </div>

        <!-- <div class="image">
          <img :src="require('@/assets/avatar/harry.jpg')"
          alt="Profile picture"
          class="profile-picture">
        </div> -->
        <section class="">
          <b-field label="Namn">
            <b-input/>
          </b-field>
          <b-field label="Title">
            <b-input/>
          </b-field>
        </section>
      </div>

    </div>
  </section>
</template>

<script>
import { db } from '../../main.js'

// Puffs
import ProfilePicturePuff from '../puffs/ProfilePicturePuff'

export default {
  components: {
    ProfilePicturePuff
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
/* .profile-picture {
    width: 200px;
    border-radius: 50%;
  } */
</style>
