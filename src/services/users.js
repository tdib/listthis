import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { collection, doc, getDoc, setDoc } from 'firebase/firestore'
import { auth, db } from './firebase'

// Create user in firebase (authentication) and firestore
export const createUser = async ({ email, displayName, password }) => {
  // Firebase authentication account creation
  const { user } = await createUserWithEmailAndPassword(auth, email, password)
  // Set display name on Firebase user object
  await updateProfile(user, { displayName: displayName })
  // Add user to Firestore
  await setDoc(doc(db, 'users', user.uid), {
    associatedListUIDs: [],
  })
  return user
}

export const getUserRecord = async userUID => {
  // auth.getUser(userUID)
  //   .catch(err => {
  //     console.error(err)
  //   })
  // return await getDoc(db, 'users', userID)
}
