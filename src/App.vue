<template>
  <div id="app">
  <!-- the router outlet, where all matched components would ber viewed -->
        <section class="container-fluid">
            <div class="row">
                <div id="menubar" class="col-12 mx-auto">
                    <div class="col-12 border">
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
