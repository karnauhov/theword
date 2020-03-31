<template>
  <v-container>
    <v-pagination v-model="pageNum" :length="this.content.verses ? this.content.verses.length : 1"></v-pagination>
    <v-expansion-panels :value="commentsExpanded" :focusable="currentPage.comments.length > 1" v-if="currentPage.comments && currentPage.comments.length > 0" :readonly="currentPage.comments.length <= 1">
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-2" color="green lighten-4">
          <template v-slot:actions v-if="currentPage.comments.length <= 1">
            <v-icon color="teal">mdi-message-arrow-left-outline</v-icon>
          </template>
          <div v-if="currentPage.comments && currentPage.comments[0].type == 'text'">{{ currentPage.comments[0].comment }}</div>
          <div v-else>{{ this.config.ui.txtComment }}</div>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="green lighten-4">
          <div class="pa-1" v-for="(comment, i) in currentPage.comments" v-bind:key="i">
            <div v-if="comment.type == 'text' && i != 0">{{ comment.comment }}</div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-sheet class="my-2" color="amber accent-1" v-for="(text, i) in this.currentPage.text" v-bind:key="i">
      <div class="ma-2" >{{ text }} <sub>({{ textPlace(i) }})</sub></div> 
    </v-sheet>
  </v-container>
</template>

<script>
  export default {
    name: 'Page',
    props: {
      content: {},
      config: {}
    },
    data: () => ({
      pageNum: 1,
      commentsExpanded: [-1],
    }),
    computed: {
      currentPage: function () {
        if (this.content && this.content.verses) {
          this.commentsExpanded = [-1];
          return this.content.verses[this.pageNum - 1];
        } else {
          return {};
        }
      }
    },
    methods: {
      textPlace: function(index) {
        const places = this.currentPage.place
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
