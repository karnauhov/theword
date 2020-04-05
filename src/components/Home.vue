<template>
  <v-container v-resize="onResize">
    <table border="1px" style="width: 100%;">
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 50%" colspan="2">{{ getPartName(3000) }}</td>
        <td style="width: 50%" colspan="2">{{ getPartName(5000) }}</td>
      </tr>
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 25%">{{ getPartName(2000) }}</td>
        <td style="width: 50%" colspan="2" rowspan="2">{{ config && config.ui ? config.ui.Christ : '' }}</td>
        <td style="width: 25%">{{ getPartName(7000) }}</td>
      </tr>
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 25%">{{ getPartName(4000) }}</td>
        <td style="width: 25%">{{ getPartName(6000) }}</td>
      </tr>
      <tr :style="{'height': windowSize.y * 0.25 + 'px'}" align="center">
        <td style="width: 50%" colspan="4">{{ getPartName(1000) }}</td>
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
      tmp: "Home page",
      windowSize: { x: 0, y: 0 },
    }),
    mounted () {
      this.onResize()
    },
    methods: {
      onResize () {
        this.windowSize = { x: window.innerWidth, y: window.innerHeight - 110 };
      },
      getPartName: function (partId) {
        if (this.config && this.config.ui && this.config.ui.menu) {
          const part = this.config.ui.menu.find(element => element.id == partId);
          if (part) {
            return part.name;
          }
        }
        return "";
      },
    },
  }
</script>
