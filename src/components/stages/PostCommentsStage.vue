<template>
    <div>
        <article v-for="(comment, key) of comments" :key="key">
            {{comment}}
        </article>

    </div>

</template>

<script>
export default {
  props: ['comments']
}

</script>

<style>

</style>