<template>
  <div>
    <table>
      <tr>
        <td>
          <img src="/assets/fish.png" v-on:click="goHome()" class="button">
        </td>
        <td>
          <h1>{{ part }}</h1>
          <Verse :text="verse" :place="place" size="0.8em"/>
        </td>
      </tr>
    </table>
    <hr>
    <ul class="border">
      <li v-on:click="$router.push('/page/rev/1/1')">{{ ch1 }}</li>
      <li v-on:click="$router.push('/page/rev/2/1')">{{ ch2 }}</li>
      <li>...</li>
    </ul>
  </div>
</template>

<script>
import Verse from '@/components/Verse.vue'

export default {
  name: 'Revelation',
  components: {
    Verse
  },
  data() {
    return {
      part: "Откровение",
      verse: "\"Се, гряду скоро: блажен соблюдающий слова пророчества книги сей.\"",
      place: "Откр. 22:7",
      ch1: "Предисловие",
      ch2: "Послание 7 церквам",
    };
  },
  methods: {
    goHome: function(event) {
      this.$router.push('/home');
    },
  }
}
</script>

<style scoped>
table {
  width: 100%;
  border: 0;
}

.button {
  width: 64px;
  height: 64px;
  cursor: pointer;
}

h1 {
  margin: 0;
}
</style>