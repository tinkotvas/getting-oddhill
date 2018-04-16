<template>
  <div id="storage">
      <h1>Hello</h1>
  </div>
</template>

<script>
import { db } from '../../main.js'

export default {
  data () {
    return {
      anArray: []
    }
  },
  watch: {
    anArray: function (d) {
      //trigger when anArray changes
    }
  },
  mounted () {
    //triggers when mounted
  },
  methods: {
      //methods
  }
}

</script>

<style scoped lang="scss">

</style>
