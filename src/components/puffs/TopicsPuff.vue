<template>
  <div class="content">
    <h3>Topics</h3>

    <div id="tags" v-for="(tag, index) of sortArray" :key="index"> 
      <button class="button is-primary is-rounded" href="#"> {{ tag.tag | uppercase }} </button>  
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

  filters: {
    uppercase: function (value) {
      return value.charAt(0).toUpperCase() + value.slice(1)
    }
  },

  computed: {
    sortArray: function(){
      function compare(a, b) {
        if(a.mentions > b.mentions)
          return -1;
        if(a.mentions < b.mentions)
          return 1;
        return 0;  
      }
      
      return Object.values(this.myTopics).sort(compare);
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
