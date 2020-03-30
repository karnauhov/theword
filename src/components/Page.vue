<template>
  <v-container>
    <v-carousel show-arrows :continuous="false" delimiter-icon="mdi-circle-slice-8">
      <v-carousel-item v-for="verse in this.content.verses" :key="verse.id">
      <v-sheet color="green" height="100%" >
        <v-row class="fill-height" align="center" justify="center">
          <div>{{ verse.text[0] }}</div>
        </v-row>
      </v-sheet>
      </v-carousel-item>
    </v-carousel>
  </v-container>
</template>

<script>
  export default {
    name: 'Page',
    props: {
      content: {}
    },
    data: () => ({

    }),
  }
</script>
