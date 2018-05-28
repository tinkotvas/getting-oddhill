<template>
  <div/>
</template>

<script>
export default {
  props: {
    fadeChars: {
      default: 25,
      type: Number
    },
    truncateChars: {
      default: 250,
      type: Number
    },
    text: {
      default: '',
      type: String
    }
  },
  computed: {
    truncated: function () {
      const truncateChars = this.truncateChars
      const fadeChars = this.fadeChars
      const value = this.text
      let result = []

      if (value.length > truncateChars) {
        result[0] = [value.substring(0, truncateChars - fadeChars), 1]
        let faded = Array.prototype.map.call(
          value.substring(truncateChars - fadeChars, truncateChars),
          (char, index) => {
            let x = index / fadeChars
            let quickMaffs = 1 - 0.12 * x - 0.88 * x ** 2
            // return `<span style="opacity: ${quickMaffs};">${char}</span>`
            return [char, quickMaffs]
          }
        )
        result = result.concat(faded)
      } else {
        result = [[value, 1]]
      }
      return result
    }
  }
}
</script>

<style>
</style>
