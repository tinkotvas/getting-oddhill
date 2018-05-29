<template>
  <div class="content">

    <div
      id="tags"
      v-for="(tag, index) of sortArray.slice(0,10)"
      :key="index">
      <router-link
        class="button topic-btn"
        :to="'/topic/'+ tag.topic"> <small>{{ tag.topic }}</small>
      </router-link>
    </div>

  </div>
</template>

<script>

export default {
  computed: {
    myTopics: function () {
      return this.$store.state.post.topics
    },
    sortArray: function () {
      function compare (a, b) {
        if (a.count > b.count) { return -1 }
        if (a.count < b.count) { return 1 }
        return 0
      }
      return Object.values(this.myTopics).sort(compare)
    }
  },
  mounted () {
    this.$store.dispatch('getTopics')
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
    font-family: Helvetica, sans-serif;
    font-size: 12px;
    display: inline-block;
    border-radius: 30px;
    font-weight: 500;
    min-width: 50px;
    padding-left: 5px;
    padding-right: 5px;
    padding-top: 5px;
    padding-bottom: 5px;
    text-decoration: none;
    cursor: pointer;
    justify-content: center;
  }
  @media (min-width: 300px) {
  .topic-btn {
    margin-top: 5px;
  }
}
</style>
