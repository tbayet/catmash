import { updateCatDB } from '~/middleware/cats.js'

export const state = () => ({
  list: []
})

export const mutations = {
  set (state, cats) {
    state.list = cats
  },
  update (state, cat) {
    const index = state.list.findIndex(elem => elem.id === cat.id)
    if (index !== -1) {
      state.list[index] = cat
    }
  }
}

export const actions = {
  async set (context, cats) {
    await context.commit('set', cats)
  },
  async vote (context, { winner, looser }) {
    await updateCatDB(winner)
    await updateCatDB(looser)
  }
}
