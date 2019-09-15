<template>
  <v-row
    class="full_size"
    justify="center"
  >
    <v-progress-circular
      v-if="!votable"
      class="mt-12"
      style="position:absolute; z-index: 5"
      :size="150"
      :width="7"
      color="pink"
      indeterminate
    />
    <v-flex
      v-if="display && catsFighting && catsFighting.length"
      :xs7="cursorOnLeft"
      :xs5="!cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = true"
      @click="votable && vote(0)"
    >
      <cat-card :color="$vuetify.theme.themes.dark.info" :img="catsFighting[0].img" />
    </v-flex>
    <v-flex
      v-if="display && catsFighting && catsFighting.length"
      :xs7="!cursorOnLeft"
      :xs5="cursorOnLeft"
      class="transition-flex"
      @mouseenter="cursorOnLeft = false"
      @click="votable && vote(1)"
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
import { watchDatabaseUpdate } from '~/middleware/cats.js'

export default {
  components: {
    CatCard
  },
  data () {
    return {
      display: false,
      votable: false,
      cursorOnLeft: true
    }
  },
  computed: {
    ...mapState({
      catsFighting: state => state.cats.versus
    })
  },
  created () {
    watchDatabaseUpdate().then((ref) => {
      ref.on('child_changed', (cat) => {
        this.update({ ...cat.val(), id: cat.ref.key })
      })
    })
  },
  mounted () {
    setTimeout(() => { this.display = true }, 100)
    setTimeout(() => { this.votable = true }, 2000)
  },
  methods: {
    ...mapActions({
      catvote: 'cats/vote',
      update: 'cats/update'
    }),
    vote () {
      this.votable = false
      setTimeout(() => { this.votable = true }, 100)
      this.catvote({ winner: this.catsFighting[0], looser: this.catsFighting[1] })
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
