<template>
  <div
    class="column"
    :style="{ 'min-height': '200px' }">
    <h1>ProfilePuff</h1>
    <div class="scaling" :style="{ 'position': 'relative', 'right': '20px' ,'padding-top': '30px'}">
      <div
        :style="{ 'display': 'inline' }"
        v-for="(profile, index) of profiles"
        :key = "index">
        <div class="is-inline">
          <img
            :src="require('@/assets/avatar/' + profile.picture)"
            :style="{ left:index * 45 + 'px'}"
            alt="Avatar"
            class="profile-img">
            <div class="img-tooltip">
              <span class="tooltip-text"
              :style="{ left: -25 + index * 45 + 'px'}">{{ profile.name }}</span>
            </div>
        </div>
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
   /*  position: relative; */
    transform: scale(1.3);
    z-index: 1000;
    transition: all 0.2s ease-in-out;
  }

  .img-tooltip .tooltip-text {
    visibility: hidden;
    width: 120px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;

    /* Position the tooltip text - see examples below! */
    position: absolute;
    z-index: 1;
  }

  .img-tooltip {
    display: inline;
  }
  /* Show the tooltip text when you mouse over the tooltip container */
  .profile-img:hover + .img-tooltip > .tooltip-text {
    position: absolute;
    visibility: visible;
    top: 120px;
  }

  /* .scaling {
    transform: scale(0.5);

  } */

</style>
