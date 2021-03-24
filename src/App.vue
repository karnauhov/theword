<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-btn :color="menuButtonColor" class="mx-2" @click.stop="openMenu()">
        <v-img alt="TheWord Logo" class="shrink" contain src="/assets/book.png" width="32"/>
      </v-btn>
      <v-container color="primary" style="min-width: 100px">
        <v-row class="my-0 py-0" no-gutters>
          <v-col><center class="font-weight-medium"><div class="text-truncate">{{ currentPartName }}</div></center></v-col>
        </v-row>
        <v-row class="my-0 py-0" no-gutters>
          <v-col><center class="font-weight-light"><div class="text-truncate">{{ currentChapterName }}</div></center></v-col>
        </v-row>
      </v-container>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped :mobile-breakpoint="mobileBreakPoint">
      <v-treeview dense @update:active="loadContent($event)" :open="this.getOpenedMenu()" :active="this.getActiveMenu()" :items="this.config.ui ? this.config.ui.menu : undefined" :activatable="true" :hoverable="true" :open-on-click="true">
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children" class="'grey darken-2'--text">{{ getMenuFolderIcon(item, open) }}</v-icon>
          <v-badge v-else :content="item.places" color="transparent" offset-x="0" offset-y="36">
            <v-icon class="ml-n4" :class="getMenuFileColor(item)">{{ getMenuFileIcon(item) }}</v-icon>
          </v-badge>
        </template>
        <template slot="label" slot-scope="item">
            <div v-if="item.item.children">{{ item.item.name }}</div>
            <div v-else class="ml-n4 mt-n4" :class="getMenuFileColor(item.item)" tabindex="0" @keydown.enter="openChapter(item.item.id)" @keydown.space="openChapter(item.item.id)" style="z-index: -1; position: absolute;">{{ item.item.name }}</div>
        </template>
      </v-treeview>
    </v-navigation-drawer>

    <v-main style="min-width: 300px">
      <Home v-if="currentChapterId == 0" :config="config" v-on:show-chapter="openChapter"/>
      <Page v-else :content="currentContent" :config="config" :chapterId="currentChapterId"/>
    </v-main>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Page from './components/Page';

const axios = require('axios').default;
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;
const MOBILE_BREAK_POINT = 1264;

export default {
  name: 'App',

  components: {
    Home,
    Page,
  },

  data: () => ({
    menuButtonColor: 'info',
    drawer: false,
    mobileBreakPoint: MOBILE_BREAK_POINT,
    config: {},
    currentContent: {},
    currentPartName: "",
    currentChapterName: "",
    currentFolderId: 0,
    currentChapterId: 0,
  }),
  created() {
    this.initData();

    // Navigate to chapter and page from params
    let chapter;
    let page;
    let item;
    if (!isNaN(parseInt(this.$route.query["id"]))) {
      chapter = parseInt(this.$route.query["id"]);
    }
    if (!isNaN(parseInt(this.$route.query["page"]))) {
      page = parseInt(this.$route.query["page"]);
    }
    if (!isNaN(parseInt(this.$route.query["item"]))) {
      item = parseInt(this.$route.query["item"]);
    }
    localStorage.scrollTo = item;
    if (chapter) {
      if (page) {
        localStorage.userPage = JSON.stringify({ "c": chapter, "p": page });
      }
      this.$router.replace({'query': null});
      this.openChapter(chapter);
    }
  },
  methods: {
    initData: async function(event) {
      // Get config
      this.getConfig();

      // Show last content
      if (localStorage.chapter && localStorage.folder) {
        this.currentFolderId = localStorage.folder;
        this.currentChapterId = localStorage.chapter;
        if (localStorage.showMenu != undefined && localStorage.showMenu != null && window.innerWidth >= this.mobileBreakPoint) {
          this.drawer = localStorage.showMenu === "true";
        }
      } else {
        localStorage.folder = 0;
        localStorage.chapter = 0;
        setTimeout(() => { this.drawer = true; setTimeout(() => { this.drawer = false; this.menuButtonColor = 'green'; }, 2000); }, 1000);
      }
    },
    getConfig: function(event) {
      axios.get(`${this.contentUrl}ru/config.json`).then(response => {
        this.config = response.data;
        document.title = this.config.ui ? this.config.ui.header : "Откровение"
        if (!localStorage.chapter || localStorage.chapter == 0) {
          this.currentPartName = this.config.ui ? this.config.ui.header : "";
          this.currentChapterName = this.config.ui ? this.config.ui.subheader : "";
        }
      });
    },
    openMenu: function() {
      this.menuButtonColor = 'info';
      this.drawer = !this.drawer;
      if (window.innerWidth >= this.mobileBreakPoint) {
        localStorage.showMenu = this.drawer;
      }
    },
    loadContent: function(ids) {
      if (ids && ids.length > 0 && ids[0] && ids[0] != 0) {
        this.currentFolderId = this.getFolderId(ids[0]);
        this.currentChapterId = ids[0];
        localStorage.folder = this.currentFolderId;
        localStorage.chapter = this.currentChapterId;
        axios.get(`${this.contentUrl}ru/${this.currentFolderId}/${this.currentChapterId}.ini`).then(response => {
          this.changeContent(this.iniToChapterObject(response.data));
        }).catch((error) => {
          this.currentChapterId = 0;
          localStorage.chapter = this.currentChapterId;
          this.changeContent({});
          console.error(error);
        });
      } else if (this.config.ui) {
        this.currentChapterId = 0;
        localStorage.chapter = this.currentChapterId;
        this.changeContent({});
      }
      if (window.innerWidth < this.mobileBreakPoint) {
        this.drawer = false;
      }
    },
    getFolderId: function(chapterId) {
      return parseInt(chapterId / 1000) * 1000;
    },
    changeContent: function(content) {
      this.currentContent = content;
      if (this.currentContent.name) {
        this.currentPartName = this.currentContent.part;
        this.currentChapterName = this.currentContent.name;
      } else {
        this.currentPartName = this.config && this.config.ui ? this.config.ui.header : "";
        this.currentChapterName = this.config && this.config.ui ? this.config.ui.subheader : "";
      }
    },
    getOpenedMenu() {
      return [this.currentFolderId];
    },
    getActiveMenu() {
      return [this.currentChapterId];
    },
    getMenuFolderIcon(item, open) {
      if (item.id === 0) {
        return 'mdi-home';
      } else if (open) {
        return 'mdi-book-open';
      } else {
        return 'mdi-book';
      }
    },
    getMenuFileIcon(item) {
      if (item.finished === undefined || item.finished === null || item.finished) {
        return 'mdi-file';
      } else {
        return 'mdi-file-edit';
      }
    },
    getMenuFileColor(item) {
      if (item.finished === undefined || item.finished === null || item.finished) {
        return '"grey darken-2"--text';
      } else {
        return 'grey--text';
      }
    },
    openChapter(id) {
      this.loadContent([id]);
    },
    iniToChapterObject(iniContent) {
      const parser = new ConfigIniParser();
      parser.parse(iniContent);
      const part = parser.get("__DEFAULT_SECTION__", "part", "").replace(/^"(.*)"$/, '$1').trim();
      const name = parser.get("__DEFAULT_SECTION__", "name", "").replace(/^"(.*)"$/, '$1').trim();
      const places = parser.get("__DEFAULT_SECTION__", "places", " ").replace(/^"(.*)"$/, '$1').trim();
      const keyText = parser.get("__DEFAULT_SECTION__", "keyText", " ").replace(/^"(.*)"$/, '$1').trim();
      const keyPlace = parser.get("__DEFAULT_SECTION__", "keyPlace", " ").replace(/^"(.*)"$/, '$1').trim();
      const sources = parser.get("__DEFAULT_SECTION__", "sources", " ").replace(/^"(.*)"$/, '$1').trim();
      const defaultVerse = parser.isHaveOption("__DEFAULT_SECTION__", "defaultVerse") ? parser.getNumber("__DEFAULT_SECTION__", "defaultVerse") : undefined;
      const sections = parser.sections();
      const verses = [];
      sections.forEach(section => {
        if (section.indexOf("verse") !== -1) {
          const verse = {};
          verse.id = Number.parseInt(section.substring(5));
          const place = parser.get(section, "place", " ").replace(/^"(.*)"$/, '$1').trim().split('|');
          const text = parser.get(section, "text", " ").replace(/^"(.*)"$/, '$1').trim().split('|');
          const comments = parser.get(section, "comments", " ").replace(/^"(.*)"$/, '$1').trim().split('|');
          const music = parser.get(section, "music", " ").replace(/^"(.*)"$/, '$1').trim().split('|');
          const groupNames = parser.get(section, "groups", " ").replace(/^"(.*)"$/, '$1').trim().split('|');
          const options = parser.options(section);
          const groups = [{"name": "", "items": []}];
          if (place) {
            verse.place = place;
          }
          if (text) {
            verse.text = text;
          }
          if (comments && comments.length > 0 && comments[0]) {
            verse.comments = comments;
          }
          if (music) {
            verse.music = music;
          }
          if (groupNames && groupNames.length > 0) {
            groupNames.forEach(name => {
              groups.push({"name": name, "items" : []})
            });
            verse.groups = groups;
          }
          if (options && options.length > 0) {
            options.forEach(option => {
              if (option.indexOf("item") === 0) {
                const itemData = parser.get(section, option, " ").replace(/^"(.*)"$/, '$1').trim().split('|');
                if (itemData.length === 4) {
                  const groupIndex = itemData[0] ? Number.parseInt(itemData[0]) : 0;
                  if (groupIndex >= 0 && groupIndex < groups.length) {
                    const item = { "id": option.substring(4), "badge": itemData[1], "icon": itemData[2], "text": itemData[3] };
                    groups[groupIndex].items.push(item);
                  }
                }
              }
            });
          }
          verses.push(verse);
        }
      });

      const json = {};
      if (part) {
        json.part = part;
      }
      if (name) {
        json.name = name;
      }
      if (places) {
        json.places = places;
      }
      if (keyText) {
        json.keyText = keyText;
      }
      if (keyPlace) {
        json.keyPlace = keyPlace;
      }
      if (sources) {
        json.sources = sources;
      }
      if (defaultVerse !== undefined) {
        json.defaultVerse = defaultVerse;
      }
      json.verses = verses;
      return json;
    }
  }
};
</script>

<style>
  .places {
    font-size: 0.6em !important;
  }

  .v-expansion-panel-header__icon {
    margin-left: 0 !important;
  }

  .v-badge__badge {
    font-size: 0.65em !important;
    font-family: "Helvetica Narrow", "Arial Narrow", Tahoma, Arial, Helvetica, sans-serif;
    color: black !important;
  }

  u {
    color: black;
    background-color:gold;
    font-family: system-ui;
    font-size: 105%;
  }

  .anchor {
    display: block;
    position: relative;
    top: -60px;
    visibility: hidden;
  }

  .embedded-video {
    width: 70vw;
    height: calc(70vw/1.9);
    margin-left: 1vw;
    margin-right: 1vw;
  }
</style>