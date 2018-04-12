<template>
  <div class="column">
      <h1>TopicPuff</h1>

    <div v-for="(tag, key) of myTopics" :key="key">
      <button class="button is-dark is-rounded" href="#"> {{ tag.tag }} </button>
    </div>

  </div>
</template>

<script>
const json = require('../assets/json/topics.json')

export default {
  name: 'TopicPuff',
  data () {
    return {
      myTopics: json.topics
    }
  }
}
</script>

<style>
</style>
