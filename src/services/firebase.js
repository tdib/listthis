import { initializeApp } from 'firebase/app'
import { collection, getFirestore } from 'firebase/firestore'
import { getAuth } from 'firebase/auth'

const firebaseConfig = {
  apiKey: 'AIzaSyB8gOh7dCu9zJ_lNSeh-yYwML9f2JiuroI',
  authDomain: 'listthis.firebaseapp.com',
  projectId: 'listthis',
  storageBucket: 'listthis.appspot.com',
  messagingSenderId: '560451453242',
  appId: '1:560451453242:web:0b9fed3279cf98880bd003',
  measurementId: 'G-67MZ1F73QM'
}

export const app = initializeApp(firebaseConfig)
export const db = getFirestore()
export const auth = getAuth()
export const listsRef = collection(db, 'lists')
