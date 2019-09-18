export const findNewVersus = (cats) => {
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
  versus.push({ ...getOpponentByPriority(cats) })
  versus.push({ ...findBestOpponent(cats, versus[0], shortestEloDiff(cats, versus[0])) })
  return versus
}
