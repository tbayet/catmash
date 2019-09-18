<template>
  <v-row class="hall_fame_container">
    <v-flex
      v-for="(cat, i) in allCatsSorted"
      :key="`${i}-${cat.score}`"
      xl1
      lg2
      md3
      sm4
      xs6
    >
      <v-card
        class="ma-2"
        flat
        :color="$vuetify.theme.themes.dark.primary"
      >
        <v-img
          :src="cat.img"
          height="200px"
        />
        <v-card-title>
          <b>#{{ i + 1 }}</b> - ({{ cat.score }} Elo) - {{ cat.nb }}
        </v-card-title>
      </v-card>
    </v-flex>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'
import { initServer } from '~/utils/cats.js'

export default {
  computed: {
    ...mapState({
      allCats: state => state.cats.list
    }),
    allCatsSorted () {
      return [...this.allCats].sort((a, b) => b.score - a.score)
    }
  },
  async mounted () {
    await this.fetchCatsDatas()
  },
  methods: {
     async fetchCatsDatas () {
      const cats = await initServer(this.$axios)
      return this.$store.dispatch('cats/set', cats)
    },
    ...mapMutations({
      setCats: 'cats/set'
    })
  }
}
</script>

<style scoped>
.hall_fame_container {
  width: 100vw;
  padding-left: 10px;
}
</style>
