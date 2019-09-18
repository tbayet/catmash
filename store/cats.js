import { updateCatDB } from '~/utils/cats.js'

// K is the factor of ascension in the classment
const getK = score => score < 1000
  ? 80
  : score < 2000
    ? 50
    : score <= 2400
      ? 30
      : 20

const calculateElo = (winner, looser) => {
  const estimate = (score, scoreVS) => (1 / (1 + 10 ** ((scoreVS - score) / 400)))
  const newScore = (score, scoreVS, result) => Math.round(
    score + getK(score) * (result - estimate(score, scoreVS))
  )
  return {
    winner: { ...winner, score: newScore(winner.score, looser.score, 1) },
    looser: { ...looser, score: newScore(looser.score, winner.score, 0) }
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
    const index = state.list.findIndex(elem => elem.id === cat.id && cat.nb > elem.nb)
    if (index !== -1) {
      state.list[index] = cat
    }
  }
}

export const actions = {
  async set (context, cats) {
    await context.commit('set', cats)
    return true
  },
  async vote (context, { winner, looser }) {
    const eloResults = calculateElo(winner, looser)
    eloResults.winner = await updateCatDB(eloResults.winner)
    eloResults.looser = await updateCatDB(eloResults.looser)
    return eloResults
  }
}
