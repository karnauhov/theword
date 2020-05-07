<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-btn :color="menuButtonColor" class="mx-2" @click.stop="openMenu()">
        <v-img alt="TheWord Logo" class="shrink" contain src="/assets/book.png" width="32"/>
      </v-btn>
      <v-container color="primary" style="min-width: 100px">
        <v-row no-gutters>
          <v-col><center class="font-weight-medium"><div class="text-truncate">{{ currentPartName }}</div></center></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col><center class="font-weight-light"><div class="text-truncate">{{ currentChapterName }}</div></center></v-col>
        </v-row>
      </v-container>
      <!-- Uncomment for language support -->
      <!-- <v-dialog v-model="dialogLanguage" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn color="info" class="ma-2" v-on="on">
            <v-img alt="Language" class="shrink" contain src="/assets/language.png" width="32"/>
          </v-btn>
        </template>
        <v-card>
          <v-card-title class="headline">{{ this.config.ui ? this.config.ui.dlgLanguage : undefined }}</v-card-title>
          <v-select class="mx-4 mt-4" v-model="lang" :items="languages.lang" item-text="name" item-value="code"
            label="Select" return-object single-line solo>
          </v-select>
          <div class="mx-6 mb-4 font-weight-medium">{{ this.getBibleTranslate(this.lang ? this.lang.code : undefined) }}</div>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="restoreLanguage()">{{ this.config.ui ? this.config.ui.btnCancel : undefined }}</v-btn>
            <v-btn color="green darken-1" text @click="setLanguage()">{{ this.config.ui ? this.config.ui.btnApply : undefined }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog> -->
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped :mobile-break-point="mobileBreakPoint">
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

    <v-content style="min-width: 300px">
      <Home v-if="currentChapterId == 0" :config="config" v-on:show-chapter="openChapter"/>
      <Help v-else-if="currentChapterId == 8000" />
      <Page v-else :content="currentContent" :config="config" :chapterId="currentChapterId"/>
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Help from './components/Help';
import Page from './components/Page';

const axios = require('axios').default;
const ConfigIniParser = require('config-ini-parser').ConfigIniParser;
const MOBILE_BREAK_POINT = 1264;
const CONTENT = "https://raw.githubusercontent.com/karnauhov/theword.content/master/";

export default {
  name: 'App',

  components: {
    Home,
    Help,
    Page,
  },

  data: () => ({
    menuButtonColor: 'info',
    drawer: false,
    mobileBreakPoint: MOBILE_BREAK_POINT,
    dialogLanguage: false,
    lang: { code: "ru", name: "Русский (Russian)" }, //{ code: "en", name: "English" }, // Change for set English by default
    languages: {},
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
    if (!isNaN(parseInt(this.$route.query["id"]))) {
      chapter = parseInt(this.$route.query["id"]);
    }
    if (!isNaN(parseInt(this.$route.query["page"]))) {
      page = parseInt(this.$route.query["page"]);
    }
    if (chapter) {
      if (page) {
        localStorage.userPage = JSON.stringify({ "c": chapter, "p": page });
      }
      this.$router.replace({'query': null});
      this.openChapter(chapter);
    }
  },
  mounted() {
    let self = this;
    window.addEventListener('keydown', function (event) {
      if (event.ctrlKey && event.keyCode === 'S'.charCodeAt(0)) {
        event.preventDefault()
        self.openMenu();
      } else if (event.ctrlKey && event.keyCode === '0'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(0);
      } else if (event.ctrlKey && (event.keyCode === '8'.charCodeAt(0) || event.keyCode === 'H'.charCodeAt(0))) {
        event.preventDefault()
        self.openChapter(8000);
      } else if (event.ctrlKey && event.keyCode === '1'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(1300);
      } else if (event.ctrlKey && event.keyCode === '2'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(2001);
      } else if (event.ctrlKey && event.keyCode === '3'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(3001);
      } else if (event.ctrlKey && event.keyCode === '4'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(4601);
      } else if (event.ctrlKey && event.keyCode === '5'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(5001);
      } else if (event.ctrlKey && event.keyCode === '6'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(6951);
      } else if (event.ctrlKey && event.keyCode === '7'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(7001);
      } else if (event.ctrlKey && event.keyCode === '9'.charCodeAt(0)) {
        event.preventDefault()
        self.openChapter(9001);
      }
    });
  },
  methods: {
    initData: async function(event) {
      // Get all languages
      await axios.get(`/assets/content/lang.json`).then(response => {
        this.languages = response.data;
      });

      // Get user language
      if (localStorage.lang) {
        this.lang = JSON.parse(localStorage.lang);
      } else if (navigator.language || navigator.userLanguage) {
        let browserLang = navigator.language || navigator.userLanguage;
        // Uncomment for language support
        //if (browserLang === 'uk' || browserLang === 'ua') {
          browserLang = 'ru';
        //}
        let lang = this.languages.lang.find( lang => lang.code === browserLang );
        if (lang) {
          this.lang = lang;
        }
        localStorage.lang = JSON.stringify(this.lang);
      } else {
        localStorage.lang = JSON.stringify(this.lang);
      }

      // Get config for language
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
      axios.get(`${CONTENT}${this.lang.code}/config.json`).then(response => {
        this.config = response.data;
        document.title = this.config.ui ? this.config.ui.header : "The Word"
        if (!localStorage.chapter || localStorage.chapter == 0) {
          this.currentPartName = this.config.ui ? this.config.ui.header : "";
          this.currentChapterName = this.config.ui ? this.config.ui.subheader : "";
        }
      });
    },
    getBibleTranslate: function(lang) {
      if (lang && this.languages && this.languages.lang) {
        let language = this.languages.lang.find(l => l.code === lang);
        if (language) {
          return language.bible;
        }
      }
      return "";
    },
    setLanguage: function(event) {
      this.dialogLanguage = false;
      localStorage.lang = JSON.stringify(this.lang);
      this.getConfig();
      this.loadContent([this.currentChapterId]);
    },
    restoreLanguage: function(event) {
      this.dialogLanguage = false;
      this.lang = JSON.parse(localStorage.lang);
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
        if (ids[0] == 8000) { // Help item
          this.currentFolderId = ids[0];
          this.currentChapterId = ids[0];
          localStorage.folder = this.currentFolderId;
          localStorage.chapter = this.currentChapterId;
          this.currentPartName = this.config && this.config.ui ? this.config.ui.header : "";
          this.currentChapterName = this.config && this.config.ui ? this.config.ui.subheader : "";
        } else {
          this.currentFolderId = this.getFolderId(ids[0]);
          this.currentChapterId = ids[0];
          localStorage.folder = this.currentFolderId;
          localStorage.chapter = this.currentChapterId;
          axios.get(`${CONTENT}${this.lang.code}/${this.currentFolderId}/${this.currentChapterId}.ini`).then(response => {
            this.changeContent(this.iniToChapterObject(response.data));
          }).catch((error) => {
            this.currentChapterId = 0;
            localStorage.chapter = this.currentChapterId;
            this.changeContent({});
            console.error(error);
          });
        }
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
      } else if (item.id === 8000) {
        return 'mdi-help';
      } else if (item.id === 9000) {
        return 'mdi-book-search';
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
          const groupNames = parser.get(section, "groups", " ").replace(/^"(.*)"$/, '$1').trim().split('|');
          const options = parser.options(section);
          const groups = [{"name": "", "links": []}];
          if (place) {
            verse.place = place;
          }
          if (text) {
            verse.text = text;
          }
          if (comments && comments.length > 0 && comments[0]) {
            verse.comments = comments;
          }
          if (groupNames && groupNames.length > 0) {
            groupNames.forEach(name => {
              groups.push({"name": name, "links" : []})
            });
            verse.groups = groups;
          }
          if (options && options.length > 0) {
            options.forEach(option => {
              if (option.indexOf("link") === 0) {
                const linkData = parser.get(section, option, " ").replace(/^"(.*)"$/, '$1').trim().split('|');
                if (linkData.length === 3) {
                  const groupIndex = linkData[0] ? Number.parseInt(linkData[0]) : 0;
                  if (groupIndex >= 0 && groupIndex < groups.length) {
                    const link = { "place": linkData[1], "text": linkData[2] };
                    groups[groupIndex].links.push(link);
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
    color: #0D47A1;
  }
</style>