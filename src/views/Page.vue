<template>
  <div>
    <div>
      <p>Long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long long comment</p>
    </div>
    <div>
      <Verse :text="verse" :place="place" size="3em" />
    </div>
    <div>
      <Verse v-for="link in links" :text="link.verse" :place="link.place" v-bind:key="link.id" size="2em"  />
    </div>
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
      verse: "Main text",
      place: "mt1",
      links: [{id: "t1", verse: "Text1", place: "txt1"}, {id: "t2", verse: "Text2", place: "txt2"}, {id: "t3", verse: "Text3", place: "txt3"}]
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