<template>
  <div class="start" v-on:click="goHome();">
    <div class="big glow" v-on:click="goHome();">{{ word }}</div>
    <Verse class="footnote" :text="verse" :place="place" size="1.3em"/>
  </div>
</template>

<script>
import Verse from '@/components/Verse.vue'

export default {
  name: 'Start',
  components: {
    Verse
  },
  data() {
    return { 
      word: "Слово",
      verse: "\"В начале было Слово, и Слово было у Бога, и Слово было Бог.\"",
      place: "Библия"
    };
  },
  created: function () {
    setTimeout(() => this.goHome(), 7000);
  },
  methods: {
    goHome: function() {
      if (this.$router.currentRoute.name != 'home') {
        this.$router.push('home');
      }
    }
  }
}
</script>

<style scoped>
.start {
  cursor: pointer;
  background-color: black;
  color: white;
  margin: 0;
  width: 100%;
  height: 100%;
  position: fixed;
}
.big {
  cursor: pointer;
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
.footnote {
  width: 100%;
  text-align: right;
  vertical-align: bottom;
  position:absolute;                  
  bottom:0;                          
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}
.glow {
  -webkit-animation: glow 2s ease-in-out infinite alternate;
  -moz-animation: glow 2s ease-in-out infinite alternate;
  animation: glow 2s ease-in-out infinite alternate;
}
@-webkit-keyframes glow {
  from {
    text-shadow: 0 0 10px #fff, 0 0 20px #fff, 0 0 30px #e6e6e6;
  }
  to {
    text-shadow: 0 0 40px #fff, 0 0 50px #fff, 0 0 60px #fff;
  }
}
</style>