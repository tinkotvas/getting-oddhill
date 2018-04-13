<template>
  <div id="app">
    <div id="navbar" class="">
        <navbar></navbar>
    </div>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view></router-view>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
export default {
  name: 'app',
  components: { Navbar }
}
</script>
<!-- styling for the component -->
<style>

</style>
