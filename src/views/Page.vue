<template>
  <div>
    <h1>Text</h1>
  </div>
</template>

<script>
import Verse from '@/components/Verse.vue'

export default {
  name: 'Page',
  components: {
    Verse
  },
    data() {
    return {
      verse: "",
      place: "",
    };
  },
  methods: {
    goHome: function(event) {
      this.$router.push('/home');
    },
  },
  beforeMount() {
    console.log("TODO: getting parent");
    console.log(this.$route.params.book + ". " + this.$route.params.chapter + ":" + this.$route.params.verse);
  },
}
</script>

<style scoped>

</style>