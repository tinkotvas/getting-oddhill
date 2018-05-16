<template>
  <section>
    <div class="columns content">
      <div class="column is-2 is-2-widescreen">
        <div class="image">
          <img :src="require('@/assets/avatar/harry.jpg')"
          alt="Profile picture"
          class="profile-picture">
        </div>
        <section class="">
          <b-field lable="Namn">
            <b-input/>
          </b-field>
          <b-field lable="Title">
            <b-input/>
          </b-field>
          <b-field lable="Språk">
            <b-input/>
          </b-field>
          <b-field lable="Verktyg">
            <b-input/>
          </b-field>
          <b-field lable="Framework">
            <b-input/>
          </b-field>
        </section>
      </div>

    </div>
  </section>
</template>

<script>
import { db } from '../../main.js'

export default {
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
.profile-picture {
    width: 200px;
    border-radius: 50%;
  }
</style>
