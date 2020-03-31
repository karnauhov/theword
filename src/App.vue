<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-btn :color="menuButtonColor" class="mx-2" @click.stop="openMenu()">
        <v-img alt="TheWord Logo" class="shrink" contain src="assets/book.png" width="32"/>
      </v-btn>
      <v-container color="primary" style="min-width: 100px">
        <v-row no-gutters>
          <v-col><center class="font-weight-medium"><div class="text-truncate">{{ currentPartName }}</div></center></v-col>
        </v-row>
        <v-row no-gutters>
          <v-col><center class="font-weight-light"><div class="text-truncate">{{ currentChapterName }}</div></center></v-col>
        </v-row>
      </v-container>
      <v-dialog v-model="dialogLanguage" persistent max-width="290">
        <template v-slot:activator="{ on }">
          <v-btn color="info" class="ma-2" v-on="on">
            <v-img alt="Language" class="shrink" contain src="assets/language.png" width="32"/>
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
      </v-dialog>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped>
      <v-treeview dense @update:active="loadContent($event)" :open="this.getOpenedMenu()" :active="this.getActiveMenu()" :items="this.config.ui ? this.config.ui.menu : undefined" :activatable="true" :hoverable="true" :open-on-click="true">
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children">{{ open ? 'mdi-book-open' : 'mdi-book' }}</v-icon>
          <v-icon v-else>{{ 'mdi-file' }}</v-icon>
        </template>
      </v-treeview>
    </v-navigation-drawer>

    <v-content>
      <Page v-if="currentChapterId && currentChapterId != 0" :content="currentContent" :config="config"/>
      <Home v-else />
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Page from './components/Page';

const axios = require('axios').default;

export default {
  name: 'App',

  components: {
    Home,
    Page,
  },

  data: () => ({
    menuButtonColor: 'info',
    drawer: false,
    dialogLanguage: false,
    lang: { code: "en", name: "English" },
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
        if (browserLang === 'uk' || browserLang === 'ua') {
          browserLang = 'ru';
        }
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
        this.loadContent([this.currentChapterId]);
      } else {
        localStorage.folder = 0;
        localStorage.chapter = 0;
        setTimeout(() => { this.drawer = true; setTimeout(() => { this.drawer = false; this.menuButtonColor = 'green'; }, 2000); }, 1000);
      }
    },
    getConfig: function(event) {
      axios.get(`/assets/content/${this.lang.code}/config.json`).then(response => {
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
      this.drawer = !this.drawer
    },
    loadContent: function(ids) {
      if (ids && ids.length > 0 && ids[0] && ids[0] != 0) {
        this.currentFolderId = this.getFolderId(ids[0]);
        this.currentChapterId = ids[0];
        localStorage.folder = this.currentFolderId;
        localStorage.chapter = this.currentChapterId;
        axios.get(`/assets/content/${this.lang.code}/${this.currentChapterId}.json`).then(response => {
          this.changeContent(response.data.content);
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
    }
  }
};
</script>
