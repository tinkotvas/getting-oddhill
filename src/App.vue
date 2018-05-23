<template>
  <div id="app">
    <component :is="theme">
      </component>
    <navbar/>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import Light from './themes/Light'
import Dark from './themes/Dark'
export default {
  components: { Navbar, Light, Dark },
  computed: {
    theme () { return this.$store.state.shared.theme }
  }
}
</script>

<style>
</style>
