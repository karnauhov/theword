<template>
  <v-container>
    <p>{{ this.content ? this.content.name : "" }}</p>
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
