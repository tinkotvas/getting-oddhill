<template>
<nav class="navbar is-transparent">
  <div class="navbar-brand">
    <router-link class="navbar-item" to="/">
      <h1>Getting Oddhill</h1>
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
      <b-dropdown position="is-bottom-left">
        <a class="navbar-item" slot="trigger">
            <span>Login</span>
        </a>
        <b-dropdown-item custom style="min-width:300px">
            <form action="">
              <b-field label="Email">
                  <b-input
                      type="email"
                      placeholder="Your email"
                      required>
                  </b-input>
              </b-field>

              <b-field label="Password">
                  <b-input
                      type="password"
                      password-reveal
                      placeholder="Your password"
                      required>
                  </b-input>
              </b-field>

              

              
              <nav class="level is-mobile">
                <div class="level-left">
                  <b-checkbox>Remember me</b-checkbox>
                </div>
                <div class="level-right">
                  <button class="button is-primary is-bottom-right">Login</button>
                </div>
              </nav>
            </form>
        </b-dropdown-item>
    </b-dropdown>

    </div>
  </div>
</nav>
</template>

<script>
export default {
  name: 'Navbar',
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

<style scoped lang="scss">

</style>
