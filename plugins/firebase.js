import firebase from 'firebase/app'
import 'firebase/database'
import CREDENTIALS from '../firebase.credentials.json'

if (!firebase.apps.length) {
  firebase.initializeApp(CREDENTIALS)
}
const DB = firebase.database()

export { DB }
