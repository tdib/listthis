import { createUserWithEmailAndPassword } from 'firebase/auth'
import { doc, setDoc, collection, query, where, getDocs, exists } from 'firebase/firestore'
import { auth, db } from '/src/config/firebase'

// Create user in firebase (authentication) and firestore
export const createUser = async ({ email, username, password }) => {
  // Firebase authentication account creation
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  // Add user to Firestore
  await setDoc(doc(db, 'users', user.uid), {
    email: user.email,
    username: username,
    associatedListIDs: [],
  })
}

// Check if a given username already exists within firestore
export const usernameExists = async username => {
  const usernameExistsQuery = query(collection(db, 'users'), where('username', '==', username))
  const querySnapshot = await getDocs(usernameExistsQuery)
  return !querySnapshot.empty
}