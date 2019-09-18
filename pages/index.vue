<template>
  <v-row
    class="full_size"
    justify="center"
  >
    <v-progress-circular
      v-if="loading"
      class="mt-12"
      style="position:absolute; z-index: 5"
      :size="150"
      :width="7"
      color="pink"
      indeterminate
    />
    <v-flex
      v-if="!loading"
      :xs7="cursorOnLeft"
      :xs5="!cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = true"
      @click="vote(0)"
    >
      <cat-card :color="$vuetify.theme.themes.dark.info" :img="catsFighting[0].img" />
    </v-flex>
    <v-flex
      v-if="!loading"
      :xs7="!cursorOnLeft"
      :xs5="cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = false"
      @click="vote(1)"
    >
      <cat-card :color="$vuetify.theme.themes.dark.warning" :img="catsFighting[1].img" />
    </v-flex>
    <v-chip
      class="ma-2 c-chip"
      x-large
      dark
      :color="$vuetify.theme.themes.dark.primary"
    >
      - Pick the cuttiest -
    </v-chip>
  </v-row>
</template>

<script>
import { mapState, mapActions } from 'vuex'
import CatCard from '~/components/CatCard.vue'
import { findNewVersus } from '~/utils/versus.js'
import { initServer } from '~/utils/cats.js'

export default {
  components: {
    CatCard
  },
  data () {
    return {
      catsFighting: [],
      loading: true,
      cursorOnLeft: true
    }
  },
  computed: {
    ...mapState({
      cats: state => state.cats.list
    })
  },
  async mounted () {
    await this.fetchCatsDatas()
    this.catsFighting = findNewVersus(this.cats)
    this.loading = false
  },
  methods: {
    async fetchCatsDatas () {
      const cats = await initServer(this.$axios)
      return this.$store.dispatch('cats/set', cats)
    },
    ...mapActions({
      catvote: 'cats/vote'
    }),
    async vote (i) {
      const updateCatinLocal = (cat) => {
        const index = this.cats.findIndex(elem => (elem.id === cat.id) && (cat.nb > elem.nb))
        if (index !== -1) {
          this.$store.commit('cats/update', cat)
        }
      }
      if (!this.loading) {
        this.loading = true
        const results = await this.catvote({ winner: this.catsFighting[i], looser: this.catsFighting[i === 1 ? 0 : 1] })
        await this.fetchCatsDatas()
        updateCatinLocal(results.winner)
        updateCatinLocal(results.looser)
        this.catsFighting = findNewVersus(this.cats)
        this.loading = false
      }
    }
  }
}
</script>

<style scoped>
.full_size {
  margin: 0;
  padding: 0;
  height: calc(100vh - 64px);
  width: 100vw;
}
.transition-flex {
  cursor: pointer;
  transition: flex-basis 0.2s linear, max-width 0.2s linear;
}
.c-chip {
  position: fixed;
  z-index: 2;
  bottom: 20px;
  left: 50%;
  transform: translateX(-50%);
  background-color: white;
}
</style>
