<template>
  <v-row
    class="full_size"
  >
    <v-flex
      v-if="catsFighting && catsFighting.length"
      :xs7="cursorOnLeft"
      :xs5="!cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = true"
      @click="vote(0)"
    >
      <cat-card :color="$vuetify.theme.themes.dark.info" :img="catsFighting[0].img" />
    </v-flex>
    <v-flex
      v-if="catsFighting && catsFighting.length"
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
import { mapMutations, mapState } from 'vuex'
import CatCard from '../components/CatCard.vue'

export default {
  components: {
    CatCard
  },
  data () {
    return {
      cursorOnLeft: true
    }
  },
  computed: {
    ...mapState({
      catsFighting: state => state.cats.list
    })
  },
  methods: {
    ...mapMutations({
      // setCats: 'cats/set'
    }),
    vote () {
      this.$store.dispatch('cats/vote', { winner: this.catsFighting[0], looser: this.catsFighting[1] })
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
