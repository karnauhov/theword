<template>
  <v-container class="pt-0" v-touch="{ left: () => swipe('Left'), right: () => swipe('Right') }">
    <v-pagination class="my-1" v-if="this.content.verses && this.content.verses.length > 1" v-model="pageNum" :length="this.content.verses ? this.content.verses.length : 1"></v-pagination>
    <v-expansion-panels :value="commentsExpanded" :focusable="currentPage.comments && currentPage.comments.length > 1" v-if="isCommentExists" :readonly="!currentPage.comments || currentPage.comments.length <= 1" class="mb-4">
      <v-expansion-panel>
        <v-expansion-panel-header class="pa-2" color="green lighten-4" @click="commentClick" :style="{'cursor': currentPage.comments && currentPage.comments.length > 1 ? 'pointer' : 'default'}">
          <template v-slot:actions>
            <v-icon class="mx-0" v-if="!currentPage.comments || currentPage.comments.length <= 1" color="teal">{{musicIcon}}</v-icon>
            <v-icon class="mx-0" v-else color="teal">{{musicIcon}}</v-icon>
            <span class="mt-1 ml-2" v-html="currentPage.comments[0]"></span>
          </template>
        </v-expansion-panel-header>
        <v-expansion-panel-content color="green lighten-4">
          <div class="pa-1" v-for="(comment, i) in currentPage.comments" v-bind:key="i">
            <div v-if="i != 0"><span v-html="comment"></span></div>
          </div>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-expansion-panels>
    <v-sheet class="mt-4" color="#FFD700" v-for="(text, i) in this.currentPage.text" v-bind:key="i">
      <div class="ma-2 pa-1 mb-4" >
        <v-badge :content="textPlace(i)" color="#FFD700" overlap offset-x="36" offset-y="4">
          <v-icon color="orange darken-1">mdi-key</v-icon>
        </v-badge>
        &nbsp;<span v-html="text"></span>
      </div> 
    </v-sheet>
    <v-sheet class="my-2" v-for="(group, j) in this.currentPage.groups" v-bind:key="j + 10">
      <center class="title">{{ group.name }}</center>
      <v-sheet class="mb-4" color="blue lighten-5" v-for="(item, k) in group.items" v-bind:key="k + 100">
        <div class="ma-2 pa-1" v-if="item.text" :id="'item' + item.id">
          <v-badge v-if="item.badge" :content="item.badge" color="blue lighten-5" overlap :offset-x="item.icon ? 36: 0" :offset-y="item.icon ? 1: -13">
            <v-icon v-if="item.icon" color="blue">{{'mdi-' + item.icon}}</v-icon>
          </v-badge>
          <v-icon v-else-if="item.icon" color="blue">{{'mdi-' + item.icon}}</v-icon>
          &nbsp;<span v-html="item.text"></span>
        </div> 
      </v-sheet>
    </v-sheet>
    <v-footer class="font-weight-medium" padless color="blue-grey lighten-4">
      <v-col class="text-center" cols="12" v-if="content">
        {{ this.content.name }}<br>{{ this.content.places }}
        <div v-if="content.keyText">
          <hr>{{ this.content.keyText }} <span v-if="content.keyPlace">[{{ this.content.keyPlace }}]</span>
        </div>
        <div v-if="content.tableOfContents">
          <hr>
          <v-expansion-panels >
            <v-expansion-panel>
              <v-expansion-panel-header color="blue-grey lighten-4" style="{cursor: pointer}">
                <center><span v-html="config.ui.tableOfContentsName"></span></center>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-left" color="blue-grey lighten-4">
                <div class="pa-0" v-for="(page, i) in content.tableOfContents" v-bind:key="i">
                  <a @click="tableOfContentsGoToPage">{{page[0]}}</a>
                  <div class="pa-0 pl-4" v-for="(section, i) in page" v-bind:key="i">
                    <span v-if="i != 0">{{section}}</span>
                  </div>
                </div>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
        <div v-if="content.sources">
          <hr>
          <v-expansion-panels >
            <v-expansion-panel>
              <v-expansion-panel-header color="blue-grey lighten-4" style="{cursor: pointer}">
                <center><span v-html="config.ui.sourceName"></span></center>
              </v-expansion-panel-header>
              <v-expansion-panel-content class="text-left" color="blue-grey lighten-4">
                <span v-html="content.sources"></span>
              </v-expansion-panel-content>
            </v-expansion-panel>
          </v-expansion-panels>
        </div>
      </v-col>
    </v-footer>
  </v-container>
</template>

<script>
const ICON_SOUND_ON = 'mdi-volume-high';
const ICON_SOUND_OFF = 'mdi-volume-off';
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
      audio: null,
      musicIcon: ICON_SOUND_OFF,
      lastMusic: '',
    }),
    updated() {
      if (!isNaN(parseInt(localStorage.scrollTo))) {
        const element = document.getElementById("item" + localStorage.scrollTo);
        if (element) {
          localStorage.scrollTo = undefined;
          this.$scrollTo(element, 2000, { offset: -80 });
        }
      }
    },
    beforeDestroy() {
      this.stopBackgroundMusic();
    },
    computed: {
      currentPage: function () {
        if (this.content && this.content.verses) {
          this.commentsExpanded = [-1];
          return this.content.verses[this.pageNum > 0 && this.pageNum <= this.content.verses.length ? this.pageNum - 1 : 0];
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
        if (this.content.verses) {
          if (direction == 'Left' && this.pageNum < this.content.verses.length) {
            this.pageNum = this.pageNum + 1;
          } else if (direction == 'Right' && this.pageNum > 0) {
            this.pageNum = this.pageNum - 1;
          }
        }
      },
      commentClick() {
        if (this.musicIcon == ICON_SOUND_OFF) {
          this.playCurrentBackgroundMusic();
        } else {
          this.stopBackgroundMusic();
        }
      },
      playCurrentBackgroundMusic () {
        this.stopBackgroundMusic();
        this.musicIcon = ICON_SOUND_ON;
        if (this.currentPage.music) {
          if (this.currentPage.music == this.lastMusic && this.audio) {
            this.audio.play();
          } else {
            this.audio = new Audio(this.currentPage.music);
            this.audio.play();
            this.lastMusic = this.currentPage.music;
          }
        }
      },
      stopBackgroundMusic () {
        this.musicIcon = ICON_SOUND_OFF;
        if (this.audio) {
          this.audio.pause();
        }
      },
      tableOfContentsGoToPage(val) {
        if (val && val.target && val.target.outerText) {
          const pageNameText = val.target.outerText;
          const nameElements = pageNameText.split('.');
          if (nameElements && nameElements.length > 0)
          {
            const newPageNum = Number.parseInt(nameElements[0]);
            if (newPageNum && newPageNum != this.pageNum)
              this.pageNum = newPageNum;
          }
        }
      }
    },
    watch: {
      content: function (val) {
        this.$vuetify.goTo(0);
        if (localStorage.userPage && this.chapterId != undefined) {
          const page = JSON.parse(localStorage.userPage);
          if (page && page.c == this.chapterId) {
            this.pageNum = page.p;
          } else {
            this.pageNum = this.content && this.content.defaultVerse ? this.content.defaultVerse : 1;
          }
        } else {
          this.pageNum = this.content && this.content.defaultVerse ? this.content.defaultVerse : 1;
        }
        if (this.content.verses && this.pageNum > this.content.verses.length) {
          this.pageNum = 1;
        }
      },
      pageNum: function (val) {
        this.stopBackgroundMusic();
        localStorage.userPage = JSON.stringify({ "c": this.chapterId, "p": this.pageNum });
      },
    }
  }
</script>
