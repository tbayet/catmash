import { DB } from '~/plugins/firebase.js'

const RESET_DB = false

const catsDataToCats = catsData =>
  Object.keys(catsData).map(key =>
    ({ ...catsData[key], id: key }))

const formatCatForDB = cat => ({ score: cat.score, img: cat.img })

export const initServer = async ($axios) => {
  console.log('INIT_SERVER')
  const catsRef = await DB.ref('cats')
  let catsData = await catsRef.once('value')
  catsData = await catsData.val()
  if (RESET_DB || (!catsData || Object.keys(catsData).length !== 100)) {
    catsData = await $axios.$get('/api/cats.json')
    catsData = catsData.images.reduce((acc, cat) => {
      acc[cat.id] = { img: cat.url, score: 1500 }
      return acc
    }, {})
    await catsRef.set(catsData)
  }
  return catsDataToCats(catsData)
}

export const updateCatDB = async (cat) => {
  const catRef = await DB.ref(`cats/${cat.id}`)
  await catRef.set(formatCatForDB(cat))
  return true
}

let watching = false

const watchDatabaseUpdate = ({ app }) => !watching && (() => {
  const catsRef = DB.ref('cats')
  console.log('Start_Middleware')
  catsRef.on('child_changed', async (cat) => {
    console.log('child_changed', cat.val(), cat.ref.key)
    await app.store.commit('cats/update', { ...cat.val(), id: cat.ref.key })
    return true
  })
  watching = true
})()

export default watchDatabaseUpdate
