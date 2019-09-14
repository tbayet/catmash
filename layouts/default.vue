<template>
  <v-app
    dark
    class="app_container"
  >
    <v-app-bar
      app
      :color="$vuetify.theme.themes.dark.secondary"
    >
      <v-toolbar-title v-text="title" />
      <v-spacer />
      <v-toolbar-items>
        <v-btn text nuxt to="/">
          VOTE
        </v-btn>
        <v-btn text nuxt to="/hall-of-fame">
          HALL OF FAME
        </v-btn>
      </v-toolbar-items>
    </v-app-bar>
    <v-content>
      <v-container ma-0 pa-0>
        <nuxt />
      </v-container>
    </v-content>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      title: 'CATMASH'
    }
  }
}
</script>

<style scoped>
.app_container {
  background-color: var(--v-info-base)
}
</style>
