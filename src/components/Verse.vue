<template>
  <div class="verse">
    <div class="text">{{ text }}</div>
    <div class="place">({{ place }})</div>
  </div>
</template>

<script>
export default {
  name: 'Verse',
  props: {
    text: String,
    place: String,
  }
}
</script>

<style scoped>
.text {
  font-family: serif;
  font-size: 1.3em;
}
.place {
  font-family: serif;
  font-size: 1.3em;
}
</style>
