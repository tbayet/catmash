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
          <b>#{{ i + 1 }}</b> - ({{ cat.score }} Elo)
        </v-card-title>
      </v-card>
    </v-flex>
  </v-row>
</template>

<script>
import { mapMutations, mapState } from 'vuex'

export default {
  components: {
  },
  data () {
    return {
    }
  },
  computed: {
    ...mapState({
      allCats: state => state.cats.list
    }),
    allCatsSorted () {
      return [...this.allCats].sort((a, b) => b.score - a.score)
    }
  },
  mounted () {
    // console.log(this.catsFighting)
  },
  methods: {
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
