<template>
  <div class="content">
    <h3>Topics</h3>

    <div
      id="tags"
      v-for="(tag, index) of sortArray"
      :key="index">
      <router-link
        class="button is-primary is-rounded"
        :to="'topic?'+ tag.tag"> {{ tag.tag | uppercase }}
      </router-link>
    </div>

  </div>
</template>

<script>

const json = require('@/assets/json/topics.json')

export default {

  filters: {
    uppercase: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },
  data () {
    return {
      myTopics: json.topics
    }
  },

  computed: {
    sortArray: function () {
      function compare (a, b) {
        if (a.mentions > b.mentions) { return -1 }
        if (a.mentions < b.mentions) { return 1 }
        return 0
      }

      return Object.values(this.myTopics).sort(compare)
    }
  }

}
</script>

<style>

  div#tags{
    display: inline;
  }

  .button{
    margin-right: 5px;
    margin-top: 10px;
  }
</style>
