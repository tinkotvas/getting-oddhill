<template>
  <div id="app">
  <!-- the router outlet, where all matched components would ber viewed -->
        <section class="columns">
            <div class="column">
                <div id="menubar" class="">
                    <div class="">
                        <app-header></app-header>
                    </div>
                </div>
            </div>
        </section>

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
