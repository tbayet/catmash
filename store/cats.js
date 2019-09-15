import { updateCatDB } from '~/middleware/cats.js'

const calculateElo = (winner, looser) => {
  return {
    winner: { ...winner, score: winner.score + 1 },
    looser: { ...looser, score: looser.score - 1 }
  }
}

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
      console.log('Update Commited')
      state.list[index] = { ...cat }
    }
  }
}

export const actions = {
  async set (context, cats) {
    await context.commit('set', cats)
  },
  async vote (context, { winner, looser }) {
    console.log(winner, looser)
    const eloResults = calculateElo(winner, looser)
    await updateCatDB(eloResults.winner)
    await updateCatDB(eloResults.looser)
  }
}
