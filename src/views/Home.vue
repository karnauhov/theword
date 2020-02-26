<template>
  <div class="home">
    <div class="big">{{ word }}</div>
  </div>
</template>

<script>
import Verse from '@/components/Verse.vue'

export default {
  name: 'Home',
  components: {
    Verse
  },
  data() {
    return { 
      word: "Иисус Христос"
    };
  },
}
</script>

<style scoped>
.home {
  background-color: white;
  color: black;
  margin: 0;
  width: 100%;
  height: 100%;
  position: fixed;
}
.big {
  font-family: serif;
  font-size: 5em;
  margin: 0;
  top: 40%;
  width: 100%;
  position: fixed;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
</style>