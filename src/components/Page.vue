<template>
  <v-container class="pt-0" v-touch="{ left: () => swipe('Left'), right: () => swipe('Right') }">
    <v-pagination class="my-1" v-model="pageNum" :length="this.content.verses ? this.content.verses.length : 1"></v-pagination>
    <v-expansion-panels :value="commentsExpanded" :focusable="currentPage.comments.length > 1" v-if="isCommentExists" :readonly="currentPage.comments.length <= 1" class="mb-4">
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
    <v-sheet class="my-2" v-for="(link, j) in this.currentPage.links" v-bind:key="j + 10">
      <center class="title">{{ link.phrase }}</center>
      <div class="subtitle-2"  v-if="link.words">[{{ link.words }}]</div>
      <v-sheet class="mb-4" color="blue lighten-5" v-for="(place, k) in link.places" v-bind:key="k + 100">
        <div class="ma-2 pa-1" v-if="place.text">
          <v-badge :content="place.place" color="blue lighten-5" overlap offset-x="36" offset-y="4">
            <v-icon color="blue">mdi-key</v-icon>
          </v-badge>
          {{ place.text }}
        </div> 
      </v-sheet>
    </v-sheet>
    <v-footer class="font-weight-medium" padless color="blue-grey lighten-4">
      <v-col class="text-center" cols="12" v-if="content">
        {{ this.content.name }}<br>{{ this.content.places }}
        <div v-if="content.keyText">
          <hr>{{ this.content.keyText }} ({{ this.content.keyPlace }})
        </div>
      </v-col>
    </v-footer>
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
      },
      isCommentExists: function() {
        return this.currentPage.comments && this.currentPage.comments.length > 0 && (this.currentPage.comments[0].comment != "" || this.currentPage.comments.length > 1);
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
      },
      swipe (direction) {
        if (direction == 'Left' && this.pageNum < this.content.verses.length) {
          this.pageNum = this.pageNum + 1;
        } else if (direction == 'Right' && this.pageNum > 0) {
          this.pageNum = this.pageNum - 1;
        }
      },
    },
    watch: {
      content: function (val) {
        this.$vuetify.goTo(0);
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
