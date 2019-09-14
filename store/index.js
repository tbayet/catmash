import { DB } from '~/plugins/firebase.js'

const RESET_DB = false

const catsDataToCats = catsData =>
  Object.keys(catsData).map(key =>
    ({ ...catsData[key], id: key }))

export const actions = {
  async nuxtServerInit ({ dispatch }, { $axios }) {
    const catsRefs = await DB.ref('cats')
    let catsData = await catsRefs.once('value')
    catsData = await catsData.val()
    if (RESET_DB || (!catsData || Object.keys(catsData).length !== 100)) {
      catsData = await $axios.$get('/api/cats.json')
      catsData = catsData.images.reduce((acc, cat) => {
        acc[cat.id] = { img: cat.url, score: 50 }
        return acc
      }, {})
      await catsRefs.set(catsData)
    }
    await dispatch('cats/set', catsDataToCats(catsData))
    return true
  }
}
