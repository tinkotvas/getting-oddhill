<template>
    <div id="App">
        <section class="container-fluid">
            <div class="row">
                <div id="menubar" class="col-12 mx-auto">
                    <div class="col-12 border">
                    </div>
                </div>
            </div>
        </section>

        <section class="container-fluid">
            <div class="row">
                <div id="stages" class="col-12 col-sm-8">
                    <PromotedStage></PromotedStage>
                </div>

                <div id="puffs" class="col-4 d-none d-sm-block">
                  <ProfilePuff></ProfilePuff>
                </div>
                <TopicPuff></TopicPuff>
            </div>
        </section>
    </div>
</template>

<script>
import PromotedStage from './components/PromotedStage'
import ProfilePuff from './components/ProfilePuff'

export default {
  name: 'App',
  components: {
    PromotedStage,
    ProfilePuff,
    TopicPuff
  }
}
</script>

<style>

</style>
