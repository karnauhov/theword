<template>
  <div class="verse">
    <div class="font" v-bind:style="{ fontSize: size }">{{ text }} ({{ place }})</div>
  </div>
</template>

<script>
export default {
  name: 'Verse',
  props: {
    text: String,
    place: String,
    size: String,
  }
}
</script>

<style scoped>
.font {
  font-family: serif;
}
</style>
