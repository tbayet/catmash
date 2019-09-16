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
      v-if="!loading && catsFighting && catsFighting.length"
      :xs7="cursorOnLeft"
      :xs5="!cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = true"
      @click="vote($event, 0)"
    >
      <cat-card :color="$vuetify.theme.themes.dark.info" :img="catsFighting[0].img" />
    </v-flex>
    <v-flex
      v-if="!loading && catsFighting && catsFighting.length"
      :xs7="!cursorOnLeft"
      :xs5="cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = false"
      @click="vote($event, 1)"
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
import CatCard from '../components/CatCard.vue'
import { findNewVersus } from '~/utils/versus.js'
import { watchDatabaseUpdate } from '~/middleware/cats.js'

export default {
  components: {
    CatCard
  },
  data () {
    return {
      catsFighting: [],
      catsWaiting: [],
      loading: true,
      cursorOnLeft: true
    }
  },
  computed: {
    ...mapState({
      cats: state => state.cats.list
    })
  },
  mounted () {
    watchDatabaseUpdate().then((ref) => {
      ref.off('child_changed')
      this.catsFighting = findNewVersus(this.cats)
      this.catsWaiting = [...this.catsFighting]
      setTimeout(() => { this.loading = false }, 1000)
      ref.on('child_changed', async (cat) => {
        this.catsWaiting = this.catsWaiting.filter(c => c.id !== cat.ref.key)
        await this.update({ ...cat.val(), id: cat.ref.key })
        if (!this.catsWaiting.length) {
          this.catsFighting = findNewVersus(this.cats)
          this.catsWaiting = [...this.catsFighting]
          setTimeout(() => { this.loading = false }, 100)
        }
      })
    })
  },
  methods: {
    ...mapActions({
      catvote: 'cats/vote',
      update: 'cats/update'
    }),
    vote (e, i) {
      if (!this.loading) {
        this.loading = true
        setTimeout(() => this.catvote({ winner: this.catsFighting[i], looser: this.catsFighting[i ? 0 : 1] }), 100)
      } else {
        e.preventDefault()
        e.stopPropagation()
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
