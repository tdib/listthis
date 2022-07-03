import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { doc, setDoc } from 'firebase/firestore'
import { auth, db } from '/src/config/firebase'

// Create user in firebase (authentication) and firestore
export const createUser = async ({ email, displayName, password }) => {
  // Firebase authentication account creation
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  // Set display name on Firebase user object
  await updateProfile(user, { displayName: displayName })
  // Add user to Firestore
  await setDoc(doc(db, 'users', user.uid), {
    associatedListIDs: [],
  })
  return user
}

export const getUser = async userID => {
  return doc(db, 'users', userID)
}
