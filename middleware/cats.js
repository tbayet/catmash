import { DB } from '~/plugins/firebase.js'

const formatCatForDB = cat => ({ score: cat.score, img: cat.img })

const watchDatabaseUpdate = ({ app }) => {
  // console.log('app:', app.store.dispatch)
}

export const updateCatDB = async (cat) => {
  const catRef = await DB.ref(`cats/${cat.id}`)
  await catRef.set(formatCatForDB(cat))
  return true
}

export default watchDatabaseUpdate
