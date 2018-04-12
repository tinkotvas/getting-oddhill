<template>
    <div id="App">
        <section class="">
            <div class="columns">
                <div id="stages" class="column">
                    <promoted-stage></promoted-stage>
                    <promoted-stage></promoted-stage>
                </div>
                <div id="puffs" class="column">
                  <profile-puff></profile-puff>
                  <topic-puff></topic-puff>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import AppHeader from './components/AppHeader'
import PromotedStage from './components/PromotedStage'
import ProfilePuff from './components/ProfilePuff'
import TopicPuff from './components/TopicPuff'

export default {
  components: {
    AppHeader,
    PromotedStage,
    ProfilePuff,
    TopicPuff
  }
}
</script>

<style>

</style>
