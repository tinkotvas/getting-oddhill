<template>
  <div class="column">
    <h1>TopicPuff</h1>

    <div
      id="tags"
      v-for="(tag, key) of myTopics"
      :key="key">
      <button
        class="button is-primary is-rounded"
        href="#"> {{ tag.tag }} </button>
    </div>

  </div>
</template>

<script>
const json = require('../../assets/Json/profiles.json')

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

  div#tags{
    display: inline;
  }

  button.button{
    margin-right: 5px;
    margin-top: 10px;
  }
</style>
