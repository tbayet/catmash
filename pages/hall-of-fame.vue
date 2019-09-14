<template>
  <v-row class="hall_fame_container">
    <v-flex
      v-for="(cat, i) in allCats"
      :key="i"
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
          <b>{{ cat.score }}</b> (#{{ cat.id }})
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
    })
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
