import { updateCatDB } from '~/middleware/cats.js'

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

const findNewVersus = (cats) => {
  const getOpponentByPriority = cats => cats.reduce((min, cat) => (cat.nb < min.nb ? cat : min), cats[0])
  const findBestOpponent = (cats, currentCat, eloDiff) =>
    cats
      .filter(cat => cat.id !== currentCat.id && Math.abs(currentCat.score - cat.score) === eloDiff)
      .reduce((best, cat) => (best === null ? cat : cat.nb < best.nb ? cat : best), null)
  const shortestEloDiff = (cats, currentCat) => cats.reduce((minDiff, cat) => {
    if (cat.id === currentCat.id) {
      return minDiff
    }
    const diff = Math.abs(currentCat.score - cat.score)
    return minDiff === null
      ? diff
      : diff < minDiff
        ? diff : minDiff
  }, null)

  const versus = []
  versus.push(getOpponentByPriority(cats))
  versus.push(findBestOpponent(cats, versus[0], shortestEloDiff(cats, versus[0])))
  return versus
}

export const state = () => ({
  list: [],
  versus: []
})

export const mutations = {
  set (state, cats) {
    state.list = cats
    state.versus = findNewVersus(cats)
  },
  update (state, cat) {
    const index = state.list.findIndex(elem => elem.id === cat.id)
    if (index !== -1) {
      state.list = [
        ...state.list.slice(0, index),
        cat,
        ...state.list.slice(index + 1, state.list.length)
      ]
      state.versus = findNewVersus(state.list)
    }
  }
}

export const actions = {
  set (context, cats) {
    context.commit('set', cats)
  },
  vote (context, { winner, looser }) {
    const eloResults = calculateElo(winner, looser)
    updateCatDB(eloResults.winner)
    updateCatDB(eloResults.looser)
  },
  update (context, cat) {
    context.commit('update', cat)
  }
}
