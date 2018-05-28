<template>
  <div>

  </div>
</template>

<script>
export default {
  filters: {
    truncate: function (value) {
      const truncateChars = 250
      const fadeChars = 25
      let truncated =
        value.length > truncateChars ? value.substring(0, truncateChars) : value
      if (truncated.length >= truncateChars) {
        // truncated = truncated + '...'
        // truncateChars = truncated.length
        let faded = Array.prototype.map.call(
          truncated.substring(truncateChars - fadeChars, truncateChars),
          (char, index) => {
            let x = index / fadeChars
            let quickMaffs = 1 - 0.12 * x - 0.88 * x ** 2
            return `<span style="opacity: ${quickMaffs};">${char}</span>`
          }
        )
        truncated =
          truncated.substring(0, truncateChars - fadeChars) + faded.join('')
      }
      return truncated
    }
  },
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
  }
}
</script>

<style>
</style>
