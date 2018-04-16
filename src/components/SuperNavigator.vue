<template>
  <div class="navbar-item has-dropdown is-hoverable">
    <p class="navbar-item">
      <b-icon
        icon="auto-fix"/>
    </p>
    <div class="navbar-dropdown is-boxed">
      <router-link
        v-for="(route, key) in routes"
        :key="key"
        class="navbar-item"
        :to="route.path">
        {{ route.path }}
      </router-link>
    </div>
  </div>
</template>

<script>
import { routes } from '../main.js'

export default {
  data () {
    return {
      routes: routes
    }
  }
}

</script>

<style lang="scss">

</style>
