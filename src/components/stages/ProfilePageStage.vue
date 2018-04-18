<template>
<div>
  <div class="columns is-centered content">
    <div class="column is-2 box">
      <img
        :src="require('@/assets/avatar/1.jpg')"
        class="profile-picture">
        <section class="box">
          <p><strong>Namn : </strong>Batman</p>
          <p><strong>Title : </strong>Webbdesigner</p>
          <p><strong>Språk : </strong>JavaScript, PHP</p>
          <p><strong>Verktyg : </strong>...</p>
          <p><strong>Framework : </strong>...</p>
        </section>
    </div>
    <div class="column is-5">
      <h4>Om Batman</h4>
      <p>Breathe in your fears. Face them. To conquer fear, you must become fear. You must bask in the fear of other men. And men fear most what they cannot see. You have to become a terrible thought. A wraith. You have to become an idea! Feel terror cloud your senses. Feel its power to distort. To control. And know that this power can be yours. Embrace your worst fear. Become one with the darkness.</p>
    </div>
    <div class="column is-1">
      <b-field grouped group-multiline>
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
  <div class="columns is-centered">
    <div class="column">

    </div>
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
