<template>
    <div id="App">

        <section class="container">
            <div class="coulmns">
                <div id="stages" class="coulmn">
                    <h1> BRA JOBBAT </h1>
                </div>
                <div id="puffs" class="coulmn">

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
