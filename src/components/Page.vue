<template>
  <v-container>
    <v-pagination v-model="pageNum" :length="this.content.verses ? this.content.verses.length : 1"></v-pagination>
    <v-expansion-panels :value="commentsExpanded" :focusable="currentPage.comments.length > 1" v-if="currentPage.comments && currentPage.comments.length > 0" :readonly="currentPage.comments.length <= 1" class="mb-4">
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-2" color="green lighten-4" :style="{'cursor': currentPage.comments.length > 1 ? 'pointer' : 'default'}">
          <template v-slot:actions>
            <v-icon class="mx-0" v-if="currentPage.comments.length <= 1" color="teal">mdi-message-arrow-right</v-icon>
            <v-icon class="mx-0" v-else color="teal">mdi-arrow-down-circle</v-icon>
            <span class="mt-1 ml-2" v-if="currentPage.comments && currentPage.comments[0].type == 'text'">{{ currentPage.comments[0].comment }}</span>
            <span v-else>{{ this.config.ui.txtComment }}</span>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="green lighten-4">
          <div class="pa-1" v-for="(comment, i) in currentPage.comments" v-bind:key="i">
            <div v-if="comment.type == 'text' && i != 0">{{ comment.comment }}</div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-sheet class="mt-4" color="amber accent-1" v-for="(text, i) in this.currentPage.text" v-bind:key="i">
      <div class="ma-2 pa-1" >
        <v-badge :content="textPlace(i)" color="amber accent-1" overlap offset-x="36" offset-y="4">
          <v-icon color="orange">mdi-label</v-icon>
        </v-badge>
        {{ text }}
      </div> 
    </v-sheet>
  </v-container>
</template>

<script>
  export default {
    name: 'Page',
    props: {
      content: {},
      config: {},
      chapterId: 0,
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
        if (localStorage.userPage && this.chapterId != undefined) {
          const page = JSON.parse(localStorage.userPage);
          if (page && page.c == this.chapterId) {
            this.pageNum = page.p;
          } else {
            this.pageNum = 1;
          }
        } else {
          this.pageNum = 1;
        }
      },
      pageNum: function (val) {
        localStorage.userPage = JSON.stringify({ "c": this.chapterId, "p": this.pageNum });
      },
    }
  }
</script>

<style>
  .v-expansion-panel-header__icon {
    margin-left: 0 !important;
  }

  .v-badge__badge {
    font-size: 0.65em !important;
    font-family: "Helvetica Narrow", "Arial Narrow", Tahoma, Arial, Helvetica, sans-serif;
    color: black !important;
  }
</style>