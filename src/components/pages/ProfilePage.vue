<template>
  <div id="App">
    <div class="section">
      <div class="container">
        <profile-page-stage/>
      </div>
    </div>
    <div class="section">
      <div class="container">
          <profile-post-puff :userData="userData"/>
      </div>
    </div>
  </div>
</template>

<script>

import { db } from '../../main.js'
// Stages
import ProfilePageStage from '../stages/ProfilePageStage'
// Puffs
import ProfilePostPuff from '../puffs/ProfilePostPuff'

export default {
  components: {
    ProfilePageStage,
    ProfilePostPuff
  },
  data() {
    return {
      userData: {}
    }
  },
  methods: {
    bindPost: function(){
      this.$bind('userData', db.collection('users').doc(this.$route.params.id))
      .then((doc)=> {
        console.log(this.userData)
      })
      .catch((error)=> {
        console.log('error', error);
      })
    }
  },
  mounted () {
    this.bindPost();
  }
}

</script>

<style>

</style>
