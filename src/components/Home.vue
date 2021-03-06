<template>
  <v-container v-resize="onResize">
    <table style="width: 100%;">
      <tr :style="{'height': windowSize.y + 'px'}" align="center">
        <td style="width: 100%" colspan="4">
          <v-carousel cycle hide-delimiter-background hide-delimiters show-arrows-on-hover :height="windowSize.y">
            <v-carousel-item v-for="chapter in getPart(1000).children" :key="chapter.id" @click.native="goToChapter(chapter.id)">
              <v-sheet class="px-4" color="white" height="100%">
                <v-row class="fill-height" align="center" justify="center">
                  <v-card width="82%" :color="colors[5]">
                    <v-card-title class="subtitle-1">{{ `${getPart(1000).name}. ${chapter.name}` }}</v-card-title>
                    <v-img width="100%" :src="getImagePath(chapter.image)" aspect-ratio="0.85"></v-img>
                  </v-card>
                </v-row>
              </v-sheet>
            </v-carousel-item>
          </v-carousel>
        </td>
      </tr>
    </table>
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
      },
      getImagePath(imageName) {
        return  this.$root.contentUrl + "images/" + (imageName ? imageName : "empty.png");
      }
    },
  }
</script>
