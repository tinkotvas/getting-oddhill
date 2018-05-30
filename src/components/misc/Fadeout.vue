<template>
  <div>
    {{ truncated[0][0] }}<span
      v-for="(chars, key) of truncated.slice(1)"
      :key="key"
      :style="`opacity: ${chars[1]};`">{{ chars[0] }}</span>
  </div>
</template>

<script>
export default {
  props: {
    fadeChars: {
      default: 25,
      type: Number
    },
    truncateChars: {
      default: 249,
      type: Number
    },
    text: {
      default: '',
      type: String
    },
    fade: {
      default: true,
      type: Boolean
    },
    dots: {
      default: false,
      type: Boolean
    },
    offset: {
      default: 0,
      type: Number
    }
  },
  computed: {
    truncated: function () {
      let truncateChars = this.truncateChars
      let fadeChars = this.fadeChars
      const offset = this.offset
      let value = this.text
      let result = []
      if (value.length > truncateChars) {
        let partial = value.substring(0, truncateChars).trim()
        if (this.dots) {
          truncateChars += 3
          partial = partial + '...'
        }
        if (offset > 0) {
          partial = partial + ' '.repeat(offset)
          truncateChars += offset
          fadeChars += offset
        }
        if (this.fade) {
          result[0] = [partial.substring(0, truncateChars - fadeChars), 1]
          let faded = Array.prototype.map.call(partial.substring(truncateChars - fadeChars, truncateChars),
            (char, index) => {
              let x = index / fadeChars
              let quickMaffs = 0.4 * x ** 2 - 1.4 * x + 1
              // 0.623886 x^2 - 1.62389 x + 1
              // return `<span style="opacity: ${quickMaffs};">${char}</span>`
              return [char, quickMaffs]
            }
          )
          result = result.concat(faded)
        } else {
          result[0] = [partial, 1]
        }
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
