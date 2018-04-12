<template>
  <div class="">
    <router-link class="ml-4 mt-2" to="/">Home</router-link>
    <router-link class="ml-4 mt-2" to="posts">Posts</router-link>
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
</style>
