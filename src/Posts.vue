<template>
  <div id="App">
    <section class="section">
      <div class="container">
        <div class="columns">
          <div
            id="stages"
            class="column">
            <post-stage/>
          </div>
          <div
            id="puffs"
            class="column is-3">
            <profile-puff class="box"/>
            <topic-puff class="box"/>
          </div>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import Navbar from './components/Navbar'
import PostStage from './components/PostsStage'
import ProfilePuff from './components/ProfilePuff'
import TopicPuff from './components/TopicPuff'

export default {
  components: {
    Navbar,
    PostStage,
    ProfilePuff,
    TopicPuff
  }
}
</script>

<style>

</style>
