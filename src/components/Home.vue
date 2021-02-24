<template>
  <v-container v-resize="onResize">
    <table style="width: 100%;">
      <tr :style="{'height': windowSize.y + 'px'}" align="center">
        <td style="width: 100%" colspan="4">
            <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y">
              <v-carousel-item v-for="chapter in getPart(1000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
                <v-sheet class="px-4" :color="colors[5]" height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="title">{{ `${getPart(1000).name} (${chapter.name})` }}</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
        </td>
      </tr>
    </table>
    <!--<table style="width: 100%;">
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 100%" colspan="4">
            <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
              <v-carousel-item v-for="chapter in getPart(4000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
                <v-sheet class="px-4" :color="colors[0]" height="100%">
                  <v-row class="fill-height" align="center" justify="center">
                    <div class="title">{{ `${getPart(4000).name} (${chapter.name})` }}</div>
                  </v-row>
                </v-sheet>
              </v-carousel-item>
            </v-carousel>
        </td>
      </tr>
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 50%" colspan="2">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
            <v-carousel-item v-for="chapter in getPart(1000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" :color="colors[1]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="title">{{ `${getPart(1000).name} (${chapter.name})` }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>          
        </td>
        <td style="width: 50%" colspan="2">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
            <v-carousel-item v-for="chapter in getPart(7000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" :color="colors[6]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="title">{{ `${getPart(7000).name} (${chapter.name})` }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>          
        </td>
      </tr>      
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 50%" colspan="2">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
            <v-carousel-item v-for="chapter in getPart(2000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" :color="colors[3]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="title">{{ `${getPart(2000).name} (${chapter.name})` }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </td>
        <td style="width: 50%" colspan="2">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
            <v-carousel-item v-for="chapter in getPart(6000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" :color="colors[5]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="title">{{ `${getPart(6000).name} (${chapter.name})` }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>          
        </td>
      </tr>
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 50%" colspan="2">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
            <v-carousel-item v-for="chapter in getPart(3000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" :color="colors[2]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="title">{{ `${getPart(3000).name} (${chapter.name})` }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>           
        </td>
        <td style="width: 50%" colspan="2">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y * 0.25">
            <v-carousel-item v-for="chapter in getPart(5000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" :color="colors[4]" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <div class="title">{{ `${getPart(5000).name} (${chapter.name})` }}</div>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>           
        </td>
      </tr>      
    </table>-->
  </v-container>
</template>

<script>
  export default {
    name: 'Home',
    props: {
      config: {},
    },
    data: () => ({
      windowSize: { x: 0, y: 0 },
      colors: ["grey", "red", "green", "lime darken-1", "light-blue accent-1", "primary", "purple"]
    }),
    mounted () {
      this.onResize()
    },
    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight - 100 };
      },
      getPart: function (partId) {
        if (this.config && this.config.ui && this.config.ui.menu) {
          const part = this.config.ui.menu.find(element => element.id == partId);
          if (part) {
            return part;
          }
        }
        return {};
      },
      goToChapter: function(id) {
        this.$emit('show-chapter', id);
      }
    },
  }
</script>
