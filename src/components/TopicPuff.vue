<template>
  <div class="column">
    <h1>TopicPuff</h1>

    <div id="tags" v-for="(tag, index) of sortArray" :key="index"> 
      <button class="button is-primary is-rounded" href="#"> {{ tag.tag }} </button>  
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
  },

  // filters: ('uppercase', function(value) {
  //   return value.toUppercase();
  // }),

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
