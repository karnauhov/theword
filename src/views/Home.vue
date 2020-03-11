<template>
  <div class="home">
    <center class="full-height">
      <div class="full-height container">
        <table class="table">
          <tr>
            <td></td>
            <td></td>
            <td align="center" v-on:click="goGospel()" @mouseenter="hoverGospel = true" @mouseleave="hoverGospel = false">
              <transition name="slide-fade-up">
                <Verse class="non-select link" :style="{ 'max-width': maxWidth + 'px' }" :text="gospelText" :place="gospelPlace" :size="middleFontSize + 'px'" v-if="showGospel"/>
              </transition>  
              <transition name="slide-fade-up">
                <p class="non-select link" :style="{ fontSize: largeFontSize + 'px' }" :class="{ hover : hoverGospel }" v-if="showGospel">{{ gospel }}</p>
              </transition>             
            </td>
            <td></td>
            <td></td>
          </tr>
          <tr>
            <td align="center" v-if="vertical" v-on:click="goOld()" @mouseenter="hoverOld = true" @mouseleave="hoverOld = false">
              <transition name="slide-fade-left">
                <Verse class="non-select vertical link" :style="{ 'max-height': maxHeight + 'px' }" :text="oldText" :place="oldPlace" :size="middleFontSize + 'px'" v-if="showOld"/>
              </transition> 
            </td>
            <td align="center" v-else v-on:click="goOld()" @mouseenter="hoverOld = true" @mouseleave="hoverOld = false">
              <transition name="slide-fade-left">
                <Verse class="non-select link" :style="{ 'max-height': maxHeight + 'px', 'width': columnWidth + 'px' }" :text="oldText" :place="oldPlace" :size="middleFontSize + 'px'" v-if="showOld"/>
              </transition> 
            </td>
            <td align="center" v-on:click="goOld()" @mouseenter="hoverOld = true" @mouseleave="hoverOld = false">
              <transition name="slide-fade-left">
                <p class="non-select vertical link" :style="{ fontSize: largeFontSize + 'px' }" :class="{ hover : hoverOld }" v-if="showOld">{{ old }}</p>
              </transition>
            </td>
            <td align="center">
              <img src="/assets/thorns.png" v-on:click="goStart()" style="{ width: 128px; height: 91px; cursor: pointer;}">
              <div class="non-select" v-on:click="goStart()" :style="{ fontSize: hugeFontSize + 'px' }">{{ name }}</div>
              <div class="non-select" v-on:click="goStart()" :style="{ fontSize: hugeFontSize + 'px' }">{{ title }}</div>
            </td>
            <td align="center" v-on:click="goRevelation()" @mouseenter="hoverRevelation = true" @mouseleave="hoverRevelation = false">
              <transition name="slide-fade-right">
                <p class="non-select vertical link" :style="{ fontSize: largeFontSize + 'px' }" :class="{ hover : hoverRevelation }" v-if="showRevelation">{{ revelation }}</p>
              </transition>
            </td>
            <td align="center" v-if="vertical" v-on:click="goRevelation()" @mouseenter="hoverRevelation = true" @mouseleave="hoverRevelation = false">
              <transition name="slide-fade-right">
                <Verse class="non-select vertical link" :style="{ 'max-height': maxHeight + 'px' }" :text="revelationText" :place="revelationPlace" :size="middleFontSize + 'px'" v-if="showRevelation"/>
              </transition> 
            </td>
            <td align="center" v-else v-on:click="goRevelation()" @mouseenter="hoverRevelation = true" @mouseleave="hoverRevelation = false">
              <transition name="slide-fade-right">
                <Verse class="non-select link" :style="{ 'max-height': maxHeight + 'px', 'width': columnWidth + 'px' }" :text="revelationText" :place="revelationPlace" :size="middleFontSize + 'px'" v-if="showRevelation"/>
              </transition> 
            </td>
          </tr>
          <tr>
            <td></td>
            <td></td>
            <td align="center" v-on:click="goActs()" @mouseenter="hoverActs = true" @mouseleave="hoverActs = false">
              <transition name="slide-fade-down">
                <p class="non-select link" :style="{ fontSize: largeFontSize + 'px' }" :class="{ hover : hoverActs }" v-if="showActs">{{ acts }}</p>
              </transition>
              <transition name="slide-fade-down">
                <Verse class="non-select link" :style="{ 'max-width': maxWidth + 'px' }" :text="actsText" :place="actsPlace" :size="middleFontSize + 'px'" v-if="showActs"/>
              </transition> 
            </td>
            <td></td>
            <td></td>
          </tr>
        </table>
      </div>
    </center>
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
      name: "Иисус",
      title: "Христос",

      old: "Ветхий завет",
      oldText: "Но Он изъязвлен был за грехи наши и мучим за беззакония наши; наказание мира нашего было на Нем, и ранами Его мы исцелились. ... На подвиг души Своей Он будет смотреть с довольством; чрез познание Его Он, Праведник, Раб Мой, оправдает многих и грехи их на Себе понесет.",
      oldPlace: "Иc. 53:5, 11",
      gospel: "Евангелие",
      gospelText: "Иисус сказал ему: Я есмь путь и истина и жизнь; никто не приходит к Отцу, как только через Меня.",
      gospelPlace: "Ин. 14:6",
      acts: "Апостолы",
      actsText: "Итак идите, научите все народы, крестя их во имя Отца и Сына и Святого Духа, уча их соблюдать все, что Я повелел вам; и се, Я с вами во все дни до скончания века. Аминь.",
      actsPlace: "Мф. 28:19, 20",
      revelation: "Откровение",
      revelationText: "Откровение Иисуса Христа, которое дал Ему Бог, чтобы показать рабам Своим, чему надлежит быть вскоре. И Он показал, послав оное через Ангела Своего рабу Своему Иоанну",
      revelationPlace: "Откр. 1:1",

      showOld: false,
      showGospel: false,
      showActs: false,
      showRevelation: false,

      hoverOld: false,
      hoverGospel: false,
      hoverActs: false,
      hoverRevelation: false,

      maxWidth: 600,
      maxHeight: 300,
      hugeFontSize: 64,
      largeFontSize: 32,
      middleFontSize: 16,
      vertical: false,
      columnWidth: 100,
    };
  },
  methods: {
    handleWindowResize: function(event) {
      let minDimension = Math.min(document.documentElement.clientWidth, document.documentElement.clientHeight);
      this.hugeFontSize = minDimension / 10;
      this.largeFontSize = minDimension / 20;
      this.middleFontSize = minDimension / 40;
      this.maxWidth = document.documentElement.clientWidth * 0.7;
      this.maxHeight = document.documentElement.clientHeight * 0.7;
      this.vertical = document.documentElement.clientWidth < document.documentElement.clientHeight;
      if (this.vertical) {
        this.columnWidth = 300;
      } else {
        this.columnWidth = document.documentElement.clientWidth / 4;
      }
    },
    goOld: function(event) {
      this.$router.push('old');
    },
    goGospel: function(event) {
      this.$router.push('gospel');
    },
    goActs: function(event) {
      this.$router.push('acts');
    },
    goRevelation: function(event) {
      this.$router.push('revelation');
    },
    goStart: function(event) {
      this.$router.push('/');
    },
  },
  created() {
    window.addEventListener('resize', this.handleWindowResize);
    this.handleWindowResize();
  },
  beforeMount() {
    setTimeout(() => { 
      this.showOld = true;
      this.showGospel = true;
      this.showActs = true;
      this.showRevelation = true;
    }, 2000);
  },
  beforeDestroy() {
    window.removeEventListener('resize', this.handleWindowResize);
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

.full-height {
  height: 100%;
}

.container {
  display: table;
}

.table {
  display: table-cell;
  vertical-align: middle;
  border: 0;
}

.slide-fade-left-enter-active {
  transition: all 2.0s ease;
}

.slide-fade-left-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-left-enter, .slide-fade-left-leave-to {
  transform: translateX(-20px);
  opacity: 0;
}

.slide-fade-right-enter-active {
  transition: all 2.0s ease;
}

.slide-fade-right-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-right-enter, .slide-fade-right-leave-to {
  transform: translateX(20px);
  opacity: 0;
}

.slide-fade-up-enter-active {
  transition: all 2.0s ease;
}

.slide-fade-up-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-up-enter, .slide-fade-up-leave-to {
  transform: translateY(-20px);
  opacity: 0;
}

.slide-fade-down-enter-active {
  transition: all 2.0s ease;
}

.slide-fade-down-leave-active {
  transition: all .8s cubic-bezier(1.0, 0.5, 0.8, 1.0);
}

.slide-fade-down-enter, .slide-fade-down-leave-to {
  transform: translateY(20px);
  opacity: 0;
}

.non-select {
  cursor: pointer;
  font-family: serif;
  margin: 0;
  -webkit-touch-callout: none;
  -webkit-user-select: none;
  -khtml-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}

.vertical {
  writing-mode: vertical-rl;
}

.link {
  color: darkblue;
}

.hover {
    text-decoration: underline darkblue;
}

</style>