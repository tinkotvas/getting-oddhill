<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <div class="columns is-multiline">

        <div class="media">

          <div class="column is-3"
            v-for="(profile, index) of profiles" :key="index">
              <div>
                <figure class="media-top">


                      <span class="image is-64*64">
                        <img
                        :src="require('@/assets/avatar/' + profile.picture)"

                        class="profile-picture">
                      </span>

                </figure>

                <div class="media-content">
                  <div class="content">
                    <span>{{ profile.name }}</span>
                  </div>
                </div>

              </div>
          </div>

        </div>





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

</style>
