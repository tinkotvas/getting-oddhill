<template>
  <div id="app">
    <div
      id="navbar"
      class="">
      <navbar/>
    </div>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view/>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'App',
  components: { Navbar }
}
</script>
<!-- styling for the component -->
<style>

</style>
