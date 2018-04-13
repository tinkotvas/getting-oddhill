<template>
  <div class="column">
    <h1>TopicPuff</h1>

    <div id="tags" v-for="(tag, key) of myTopics" :key="key"> 
      <button class="button is-primary is-rounded" href="#"> {{ tag.mentions }} </button>  
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
        if(a.tag.mentions < b.tag.mentions)
          return -1;
        if(a.tag.mentions > b.tag.mentions)
          return 1;
        return 0;  
      }
      
      return this.myTopics.sort(compare);
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
