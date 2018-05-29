<template>
  <div class="content">

    <div
      id="tags"
      v-for="(tag, index) of sortArray"
      :key="index">
      <router-link
        class="button is-small topic-btn"
        :to="'/topic/'+ tag.tag"> <small>{{ tag.tag }}</small>
      </router-link>
    </div>

  </div>
</template>

<script>

const json = require('@/assets/json/topics.json')

export default {

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
    margin-right: 10px;
  }

  .topic-btn {
    border: none;
  }


</style>
