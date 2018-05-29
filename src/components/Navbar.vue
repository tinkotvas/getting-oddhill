<template>
  <nav class="navbar is-fixed-top is-white">
    <div class="navbar-brand">
      <span class="navbar-item">
        <router-link to="/" active-class="" exact-active-class="" class="logo"><strong>getting odd hill.</strong></router-link>
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
      <div class="navbar-start"/>

      <div
        v-if="authReady"
        class="navbar-end">
        <router-link
          class="navbar-item"
          to="/posts">posts</router-link>
        <router-link
          class="navbar-item"
          to="/profiles">profiles</router-link>
        <router-link
          class="navbar-item"
          to="/profile">profile</router-link>
        <a
          v-if="currentUser"
          @click.prevent="onSignOut"
          class="navbar-item">log out</a>
        <b-dropdown
          v-if="!currentUser"
          position="is-bottom-left">
          <a
            class="navbar-item"
            slot="trigger">
            <span>log in</span>
          </a>
          <b-dropdown-item
            custom
            style="min-width:350px">
            <form action="">
              <b-field label="Email">
                <b-input
                  class="email-text"
                  type="email"
                  placeholder="Your email"
                  required
                  v-model="email"/>
              </b-field>

              <b-field label="Password">
                <b-input
                  class="email-text"
                  type="password"
                  password-reveal
                  placeholder="Your password"
                  required
                  v-model="password"/>
              </b-field>

              <nav class="level is-mobile">
                <div class="level-left">
                  <b-checkbox>remember me</b-checkbox>
                </div>
                <div class="level-right">
                  <button
                    class="button log-btn is-bottom-right"
                    @click.prevent="onSignIn">log in</button>
                  <button
                    class="button log-btn is-bottom-left"
                    @click.prevent="onSignUp">register</button>
                </div>
                <div>
                  <button class="button git-login"><b-icon icon="github-circle"/></button>
                  <button class="button google-login"><b-icon icon="google"/></button>
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
import { mapState } from 'vuex'

export default {
  data () {
    return {
      navActive: false,
      email: '',
      password: ''
    }
  },
  computed: {
    currentUser () {
      return this.$store.getters.currentUser
    },
    ...mapState({authReady: state => state.user.authReady})
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
@import ".././styles/variables.scss";
$navactive: #3e30ed;
.is-active {
  color: $navactive !important;
}

.navbar.is-white a.navbar-item:hover,
.navbar.is-white a.navbar-link:hover,
.navbar.is-white a.navbar-link:focus,
.navbar.is-white a.navbar-item.is-active {
  color: transparentize($navactive, 0.1) !important;
  background-color: #fff;
}

.dropdown .dropdown-menu .dropdown-content .level .button {
  margin-left: 6px;
}

.logo {
  font-family: Helvetica, sans-serif;
  font-size: 20px;
  color:#000;
}

.navbar-item,
.email-text {
  font-family: Helvetica, sans-serif;
}

.log-btn {
  @include btn;
}

</style>
