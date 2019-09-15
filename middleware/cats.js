import { DB } from '~/plugins/firebase.js'

let RESET_DB = false

const catsDataToCats = catsData =>
  Object.keys(catsData).map(key =>
    ({ ...catsData[key], id: key }))

export const initServer = async ($axios) => {
  const catsRef = await DB.ref('cats')
  let catsData = await catsRef.once('value')
  catsData = await catsData.val()
  if (RESET_DB || (!catsData || Object.keys(catsData).length !== 100)) {
    catsData = await $axios.$get('/api/cats.json')
    catsData = catsData.images.reduce((acc, cat) => {
      acc[cat.id] = { img: cat.url, score: 1500, nb: 0 }
      return acc
    }, {})
    await catsRef.set(catsData)
    RESET_DB = false
  }
  return catsDataToCats(catsData)
}

export const updateCatDB = async (cat) => {
  const catRef = await DB.ref(`cats/${cat.id}`)
  await catRef.set({ score: cat.score, img: cat.img, nb: cat.nb + 1 })
  return true
}

export const watchDatabaseUpdate = async (context) => {
  const catsRef = await DB.ref('cats')
  return catsRef
}
