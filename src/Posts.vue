<template>
    <div id="App">

        <section class="container">
            <div class="row">
                <div id="stages" class="col-12 col-md-8">
                    <h1> BRA JOBBAT </h1>
                </div>
                <div id="puffs" class="col-4 d-none d-md-block">

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
