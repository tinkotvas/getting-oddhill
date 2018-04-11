<template>
  <div class="d-flex flex-row bg-light pl-2 pr-2">

    <a class="navbar-brand">Getting Oddhill</a>
    <router-link class="ml-4 mt-2" to="/">Home</router-link>
    <router-link class="ml-4 mt-2" to="posts">Posts</router-link>
    <router-link class="ml-4 mt-2 pr-4 mr-auto" to="#">Profiles</router-link>
    <input class="form-control m-1 mr-sm-2" type="search" placeholder="Search" aria-label="Search">
    <button class="btn btn-outline-primary m-1 mr-auto" type="submit">Search</button>
    <router-link class="ml-4 mt-2" to="#">Login</router-link>

    <div class="dropdown">
      <div class="dropdown_header" @click="toggleDropdown($event)">
        <p class="ml-4 mt-2" to="#">Menu</p>
      </div>
      <div class="dropdown_content">
        <ul>
          <li>Home</li>
          <li>Posts</li>
          <li>Profiles</li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'AppHeader',
  methods: {
    toggleDropdown (event) {
      event.currentTarget.classList.toggle('is-active')
    }
  }
}
</script>

<style lang="scss">
  input {
    min-width: 100px;
    max-width: 250px;
  }

  @media only screen and (max-width: 668px) {
    input,
    button {
      display: none !important;
    }
  }

  @media only screen and (max-width: 540px) {
    input,
    button {
      display: none !important;
    }
  }

  .dropdown {
    &_header {
      cursor: pointer;
      position: relative;
      &.is-active {
        +.dropdown_content {
          height: auto;
          opacity: 1;
          visibility: visible;
        }
      }
    }
    &_content {
      height: 0;
      overflow: hidden;
      visibility: hidden;
      position: absolute;
    }
  }
</style>
