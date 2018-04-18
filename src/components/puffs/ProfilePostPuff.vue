<template>
  <div class="columns is-centered">
    <div class="column is-8">
      <b-notification class="content" :closable="false" ref="ProfilePostPuff">
        <h3><strong>Inlägg av Batman</strong></h3>
        <p :v-if="userData" v-for="(post, key) in userData.posts" :key="key">
            <strong>{{post.heading}}</strong>
            {{post.createdAt}}
            <br>{{ (post.message).substring(0, 300) }}... ...
        </p>
      </b-notification>
    </div>
  </div>
</template>

<script>

export default {
  props: ['userData']
}

</script>

<style>

</style>
