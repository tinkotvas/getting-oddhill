<template>
    <div id="App">
        <section class="section">
            <div class="container">
                <div class="columns">
                    <div id="stages" class="column">
                        <promoted-stage class="box"></promoted-stage>
                    </div>
                    <div id="puffs" class="column is-3">
                    <profile-puff class="box"></profile-puff>
                    <topic-puff class="box"></topic-puff>
                    </div>
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
