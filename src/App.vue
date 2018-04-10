<template>
    <div id="App">
        <section class="container-fluid mb-3">
            <div class="row">
                <div id="menubar" class="col-12 mx-auto">
                    <div class="col-12 border">
                        <example-menu></example-menu>
                    </div>
                </div>
            </div>
        </section>

        <section class="container">
            <div class="row">
                <div id="stages" class="col-12 col-md-8">
                    <promoted-stage></promoted-stage>
                </div>
                <div id="puffs" class="col-4 d-none d-md-block">
                  <profile-puff></profile-puff>
                  <topic-puff></topic-puff>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import ExampleMenu from './components/ExampleMenu'
import PromotedStage from './components/PromotedStage'
import ProfilePuff from './components/ProfilePuff'
import TopicPuff from './components/TopicPuff'

export default {
  name: 'App',
  components: {
    ExampleMenu,
    PromotedStage,
    ProfilePuff,
    TopicPuff
  }
}
</script>

<style>

</style>
