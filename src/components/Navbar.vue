<template>
<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <img src="https://bulma.io/images/bulma-logo.png" alt="Bulma: router-link modern CSS framework based on Flexbox" width="112" height="28">
    </router-link>
    <div class="navbar-burger burger" data-target="navbarExampleTransparentExample" @click="toggleMenu" :class="{'is-active': navActive}">
      <span></span>
      <span></span>
      <span></span>
    </div>
  </div>

  <div id="navbarExampleTransparentExample" class="navbar-menu" :class="{'is-active': navActive}">
    <div class="navbar-start">
          <router-link class="navbar-item" to="/">Home</router-link>
    <router-link class="navbar-item" to="posts">Posts</router-link>
      <div class="navbar-item has-dropdown is-hoverable">
        <a target="_blank" class="navbar-link" href="https://bulma.io/documentation/overview/start/">
          Docs
        </a>
        <div class="navbar-dropdown is-boxed">
          <a target="_blank" class="navbar-item" href="https://bulma.io/documentation/overview/start/">
            Overview
          </a>
          <a target="_blank" class="navbar-item" href="https://bulma.io/documentation/modifiers/syntax/">
            Modifiers
          </a>
          <a target="_blank" class="navbar-item" href="https://bulma.io/documentation/columns/basics/">
            Columns
          </a>
          <a target="_blank" class="navbar-item" href="https://bulma.io/documentation/layout/container/">
            Layout
          </a>
          <a target="_blank" class="navbar-item" href="https://bulma.io/documentation/form/general/">
            Form
          </a>
          <hr class="navbar-divider">
          <a target="_blank" class="navbar-item" href="https://bulma.io/documentation/elements/box/">
            Elements
          </a>
          <a target="_blank" class="navbar-item is-active" href="https://bulma.io/documentation/components/breadcrumb/">
            Components
          </a>
        </div>
      </div>
    </div>

    <div class="navbar-end">
      <div class="navbar-item">
        <div class="field is-grouped">

        </div>
      </div>
    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'AppHeader',
  data () {
    return {
      navActive: false
    }
  },
  methods: {
    toggleDropdown (event) {
      event.currentTarget.classList.toggle('is-active')
    },
    toggleMenu () {
      this.navActive = !this.navActive
    }
  }
}
</script>

<style lang="scss">

</style>
