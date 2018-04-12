<template>
  <div class="column">
      <section>
        <b-field label="Add some tags">
            <b-taginput
                v-model="tags"
                icon="label"
                placeholder="Add a tag">
            </b-taginput>
        </b-field>
        <p class="content"><b>Tags:</b> {{ tags }}</p>
    </section>
  </div>
</template>

<script>
const json = require('../assets/json/topics.json')

export default {
  name: 'TopicPuff',
          data() {
            return {
                tags: [
                    'Auckland',
                    'Wellington',
                    'Napier'
                ]
            }
        }
}
</script>

<style>

</style>
