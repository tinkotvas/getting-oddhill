<template>
  <div
    class="column"
    :style="{ 'min-height': '200px' }">
    <h1>ProfilePuff</h1>
    <div
      :style="{ 'position': 'relative', 'right': '43px' ,'padding-top': '30px', 'transform': `scale(${this.scale}`}">
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
            <span
              class="tooltip-text"
              :style="{ left: -5 + index * 45 + 'px'}">{{ profile.name }}</span>
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
      profiles: json.profiles,
      scale: 1
    }
  },
  mounted () {
    this.$nextTick(() => {
      window.addEventListener('resize', this.resizeAvatars)
      this.resizeAvatars()
    })
  },
  methods: {
    resizeAvatars () {
      let scale = this.$parent.$refs.profilesPuff.$el.clientWidth / 300
      this.scale = scale
    }
  }
}
</script>

<style scoped>
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
    width: 80px;
    background-color: black;
    color: #fff;
    text-align: center;
    padding: 5px 0;
    border-radius: 6px;
    /* Position the tooltip text! */
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

</style>
