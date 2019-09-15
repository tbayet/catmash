import { initServer } from '~/middleware/cats.js'

export const actions = {
  async nuxtServerInit ({ dispatch }, { $axios }) {
    const cats = await initServer($axios)
    await dispatch('cats/set', cats)
    return true
  }
}
