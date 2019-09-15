import { initServer } from '~/middleware/cats.js'

export const state = () => ({
  watchingDatabaseUpdate: false
})

export const mutations = {
  watchingDatabase (state) {
    state.watchingDatabaseUpdate = true
  }
}

export const actions = {
  async nuxtServerInit (context, { $axios }) {
    const cats = await initServer($axios)
    context.dispatch('cats/set', cats)
  }
}
