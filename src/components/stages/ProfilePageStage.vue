<template>
  <div>
    <div class="columns is-centered content">
      <div class="column is-3 box profile-box is-2-widescreen">
        <div class="image">
          <img
            :src="require('@/assets/avatar/wind.jpg')"
            class="profile-picture">
        </div>
        <section class="">
          <p><strong>Namn : </strong>
            {{ userData.username }}</p>
          <p><strong>Title : </strong>{{ userData.title }}</p>
          <p><strong>Språk : </strong>..</p>
          <p><strong>Verktyg : </strong>...</p>
          <p><strong>Framework : </strong>...</p>
        </section>
      </div>
      <div class="column is-7">
        <h4>Om {{ userData.username }}</h4>
        <p>{{ userData.bio }}</p>
      </div>
      <div class="column is-1">
        <b-field
          grouped
          group-multiline>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">Github</b-tag>
              <b-tag type="is-info"><b-icon
                icon="github-face"/></b-tag>
            </b-taglist>
          </div>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">Twitter</b-tag>
              <b-tag type="is-info"><b-icon
                icon="twitter"/></b-tag>
            </b-taglist>
          </div>
          <div class="control">
            <b-taglist attached>
              <b-tag type="is-dark">LinkedIn</b-tag>
              <b-tag type="is-info"><b-icon
                icon="linkedin"/></b-tag>
            </b-taglist>
          </div>

        </b-field>
      </div>
    </div>
    <div class="columns is-centered">
      <div class="column"/>
    </div>
  </div>
</template>

<script>
const json = require('../../assets/json/profiles.json')

export default {
  props: ['userData'],
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
    border-radius: 50%;
  }

  .profile-box {
  background-color: rgba(152, 226, 248, 0.212);
  }
</style>
