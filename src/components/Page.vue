<template>
  <v-container>
    <v-pagination v-model="pageNum" :length="this.content.verses ? this.content.verses.length : 1"></v-pagination>
    <v-sheet class="my-2" color="amber accent-1" v-for="(text, i) in this.currentPage().text" v-bind:key="i">
      <div class="ma-2" >{{ text }} <sub>({{ textPlace(i) }})</sub></div> 
    </v-sheet>
  </v-container>
</template>

<script>
  export default {
    name: 'Page',
    props: {
      content: {}
    },
    data: () => ({
      pageNum: 1,
    }),
    methods: {
      currentPage: function() {
        if (this.content && this.content.verses) {
          return this.content.verses[this.pageNum - 1];
        } else {
          return {};
        }
      },
      textPlace: function(index) {
        const places = this.currentPage().place
        if (places && places.length > index) {
          return places[index];
        } else {
          return "";
        }
      }
    },
    watch: {
      content: function (val) {
        this.pageNum = 1;
      },
    }
  }
</script>
