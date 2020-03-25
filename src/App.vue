<template>
  <v-app>
    <v-app-bar app clipped-left color="primary" dark>
      <v-btn color="info" class="mx-2" @click.stop="drawer = !drawer">
        <v-img alt="TheWord Logo" class="shrink" contain src="assets/book.png" width="32"/>
      </v-btn>
      <v-container color="primary">
        <v-row no-gutters>
          <v-col><center class="font-weight-medium">{{ currentPartName }}</center></v-col>
          <!-- <v-col><v-subheader class="centered-input">{{ currentPartName }}</v-subheader></v-col> -->
        </v-row>
        <v-row no-gutters>
          <v-col><center class="font-weight-light">{{ currentChapterName }}</center></v-col>
          <!-- <v-col><v-banner class="mx-0" single-line max-width="500" min-width="20" color="primary" >{{ currentChapterName }}</v-banner></v-col> -->
          <!-- <v-col><center><v-chip class="ma-2">{{ currentChapterName }}</v-chip></center></v-col> -->
          <!-- <v-col><v-text-field v-model="currentChapterName" class="centered-input ma-0 pa-0" color="primary" solo flat single-line dence readonly ></v-text-field></v-col> -->
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
          <v-select class="ma-4" v-model="lang" :items="languages.lang" item-text="name" item-value="code"
            label="Select" return-object single-line solo>
          </v-select>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="green darken-1" text @click="restoreLanguage()">{{ this.config.ui ? this.config.ui.btnCancel : undefined }}</v-btn>
            <v-btn color="green darken-1" text @click="setLanguage()">{{ this.config.ui ? this.config.ui.btnApply : undefined }}</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app-bar>

    <v-navigation-drawer app v-model="drawer" clipped>
      <v-treeview dense @update:active="loadContent($event)" :items="this.config.ui ? this.config.ui.menu : undefined" :activatable="true" :hoverable="true" :open-on-click="true">
        <template v-slot:prepend="{ item, open }">
          <v-icon v-if="item.children">{{ open ? 'mdi-folder-open' : 'mdi-folder' }}</v-icon>
          <v-icon v-else>{{ 'mdi-file' }}</v-icon>
        </template>
      </v-treeview>
    </v-navigation-drawer>

    <v-content>
      <Page v-if="currentChapterId && currentChapterId != 0" :content="content"/>
      <Home v-else />
    </v-content>
  </v-app>
</template>

<script>
import Home from './components/Home';
import Page from './components/Page';

export default {
  name: 'App',

  components: {
    Home,
    Page,
  },

  data: () => ({
    drawer: false,
    dialogLanguage: false,
    lang: { code: "en", name: "English" },
    languages: {},
    config: {},
    content: {},
    currentPartName: "",
    currentChapterName: "",
    currentChapterId: 0,
  }),
  mounted() {
    
  },
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
        if (browserLang === 'uk') {
          browserLang = 'ua';
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
      if (localStorage.chapter) {
        this.loadContent([localStorage.chapter]);
        // TODO select in menu
      } else {
        localStorage.chapter = 0;
      }
    },
    getConfig: function(event) {
      axios.get(`/assets/content/${this.lang.code}/config.json`).then(response => {
        this.config = response.data;
        if (!localStorage.chapter || localStorage.chapter == 0) {
          this.currentPartName = this.config.ui ? this.config.ui.header : "";
          this.currentChapterName = this.config.ui ? this.config.ui.subheader : "";
        }
      });
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
    loadContent: function(ids) {
      if (ids && ids.length > 0 && ids[0] && ids[0] != 0) {
        axios.get(`/assets/content/${this.lang.code}/${ids[0]}.json`).then(response => {
          localStorage.chapter = ids[0];
          this.currentChapterId = ids[0];
          this.content = response.data.content;
          this.currentPartName = this.content.part;
          this.currentChapterName = this.content.name;
        }).catch((error) => {
          localStorage.chapter = 0;
          this.content = {};
          this.currentChapterId = 0;
          this.currentPartName = this.config && this.config.ui ? this.config.ui.header : "";
          this.currentChapterName = this.config && this.config.ui ? this.config.ui.subheader : "";
          console.error(error);
        });
      } else {
        localStorage.chapter = 0;
        this.content = {};
        this.currentChapterId = 0;
        this.currentPartName = this.config && this.config.ui ? this.config.ui.header : "";
        this.currentChapterName = this.config && this.config.ui ? this.config.ui.subheader : "";
      }
    },
  }
};
</script>
