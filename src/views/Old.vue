<template>
  <div>
    <table>
      <tr>
        <td width="1%">
          <img src="/assets/fish.png" v-on:click="goHome()" class="button">
        </td>
        <td>
          <h1 class="zero-margin">{{ part }}</h1>
          <Verse :text="verse" :place="place" size="0.8em"/>
        </td>
      </tr>
    </table>
    <hr class="zero-margin">
    <ul class="border">
      <li>...</li>
    </ul>
  </div>
</template>

<script>
import Verse from '@/components/Verse.vue'

export default {
  name: 'Old',
  components: {
    Verse
  },
    data() {
    return {
      part: "Ветхий завет",
      verse: "\"И, начав от Моисея из всех пророков изъяснял им сказанное о Нем во всем Писании.\"",
      place: "Лк. 24:27"
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
</style>