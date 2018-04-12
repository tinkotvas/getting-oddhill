<template>
  <div class="col-12 border">
      <h1>TopicPuff</h1>

    <div v-for="(bajs, key) of myTopics" :key="key"> 
      <a href="#">{{ bajs.tag }} </a>  
    </div>

  </div>
</template>

<script>
const json = require('../assets/json/topics.json')

export default {
  name: 'TopicPuff',
  data(){
    return{
      myTopics: []
    }
  } 
}
</script>

<style>

</style>
