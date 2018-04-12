<template>
  <div id="app">
    <div id="navbar" class="">
        <app-header></app-header>
    </div>
    <!-- the router outlet, where all matched components would ber viewed -->
    <router-view></router-view>
  </div>
</template>

<script>
import AppHeader from './components/AppHeader'
export default {
  name: 'app',
  components: { AppHeader }
}
</script>
<!-- styling for the component -->
<style>

</style>
