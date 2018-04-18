<template>
  <nav class="navbar is-transparent">
    <div class="navbar-brand">
      <span class="navbar-item">
        <h1>Getting Oddhill</h1>
      </span>
      <div
        class="navbar-burger burger"
        data-target="navbarExampleTransparentExample"
        @click="toggleMenu"
        :class="{'is-active': navActive}">
        <span/>
        <span/>
        <span/>
      </div>
    </div>

    <div
      id="navbarExampleTransparentExample"
      class="navbar-menu"
      :class="{'is-active': navActive}">
      <div class="navbar-start">
        <router-link
          class="navbar-item"
          to="/">
          <b-icon
          icon="home"/> Home</router-link>
        <router-link
          class="navbar-item"
          to="posts">Posts</router-link>
        <router-link
          class="navbar-item"
          to="profiles">Profiles</router-link>
        <router-link
          class="navbar-item"
          to="profile">Profile</router-link>
        <div class="navbar-item has-dropdown is-hoverable">
          <a
            target="_blank"
            class="navbar-link"
            href="https://bulma.io/documentation/overview/start/">
            Bulma Docs
          </a>
          <div class="navbar-dropdown is-boxed">
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/overview/start/">
              Overview
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/modifiers/syntax/">
              Modifiers
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/columns/basics/">
              Columns
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/layout/container/">
              Layout
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/form/general/">
              Form
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/elements/box/">
              Elements
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://bulma.io/documentation/components/breadcrumb/">
              Components
            </a>
          </div>
        </div>
        <div class="navbar-item has-dropdown is-hoverable">
          <a
            target="_blank"
            class="navbar-link"
            href="https://buefy.github.io/#/documentation/start/">
            Buefy Docs
          </a>
          <div class="navbar-dropdown is-boxed">
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/layout">
              Layout & elements
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/dropdown">
              Dropdowns
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/autocomplete">
              Autocomplete
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/field">
              Field
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/input">
              Input
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/message">
              Message
            </a>
            <a
              target="_blank"
              class="navbar-item"
              href="https://buefy.github.io/#/documentation/snackbar">
              Snackbar
            </a>
          </div>
        </div>
      </div>

      <div class="navbar-end">
        <super-navigator/>
        <a
          v-if="user"
          @click.prevent="onSignOut"
          class="navbar-item">Log out</a>
        <b-dropdown
          v-else
          position="is-bottom-left">
          <a
            class="navbar-item"
            slot="trigger">
            <span>Log in</span>
          </a>
          <b-dropdown-item
            custom
            style="min-width:350px">
            <form action="">
              <b-field label="Email">
                <b-input
                  type="email"
                  placeholder="Your email"
                  required
                  v-model="email"/>
              </b-field>

              <b-field label="Password">
                <b-input
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  required
                  v-model="password"/>
              </b-field>

              <nav class="level is-mobile">
                <div class="level-left">
                  <b-checkbox>Remember me</b-checkbox>
                </div>
                <div class="level-right">
                  <button
                    class="button is-primary is-bottom-right"
                    @click.prevent="onSignIn">Log in</button>
                  <button
                    class="button is-primary is-bottom-left"
                    @click.prevent="onSignUp">Register</button>
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
import SuperNavigator from './SuperNavigator'

export default {
  components: {
    SuperNavigator
  },
  data () {
    return {
      navActive: false,
      email: '',
      password: ''
    }
  },
  computed: {
    user () {
      return this.$store.getters.user
    }
  },
  methods: {
    toggleDropdown (event) {
      event.currentTarget.classList.toggle('is-active')
    },
    toggleMenu () {
      this.navActive = !this.navActive
    },
    onSignUp () {
      this.$store.dispatch('signUp', {
        email: this.email,
        password: this.password
      })
    },
    onSignIn () {
      this.$store.dispatch('signIn', {
        email: this.email,
        password: this.password
      })
    },
    onSignOut () {
      this.$store.dispatch('signOut')
    }
  }
}
</script>

<style scoped lang="scss">
$navactive: #1abc9c;
.is-active {
  color: $navactive !important;
}

.navbar.is-transparent a.navbar-item:hover,
.navbar.is-transparent a.navbar-link:hover {
  color: transparentize($navactive, 0.1) !important;
}
</style>
