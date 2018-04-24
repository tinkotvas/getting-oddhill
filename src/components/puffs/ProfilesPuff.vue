<template>
  <div
    class="column"
    :style="{ 'min-height': '200px' }">
    <h1>ProfilePuff</h1>
    <div :style="{ 'position': 'relative', 'padding-top': '30px'}">
      <div
        :style="{ 'display': 'inline' }"
        v-for="(profile, index) of profiles"
        :key = "index">
        <img
          :src="require('@/assets/avatar/' + profile.picture)"
          :style="{ left:index * 30 + 'px'}"
          alt="Avatar"
          class="profile-img">
      </div>
      <!-- <a href="#">{{ profile.name }}</a> -->

    </div>
  </div>
</template>

<script>
const json = require('@/assets/json/profiles.json')

export default {
  data () {
    return {
      profiles: json.profiles
    }
  }
}
</script>

<style>
  .profile-img {
    width: 70px;
    height: 70px;
    border: 1px solid #ccc;
    border-radius: 50%;
    position: absolute;
    z-index: auto;
  }

  .profile-img:hover {
    position: relative;
    transform: scale(1.5);
    z-index: 1000;
    transition: all 0.2s ease-in-out;
}
</style>
