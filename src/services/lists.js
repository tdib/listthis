import { collection, doc, getDocs, getDoc, query, where, documentId } from 'firebase/firestore'
import { db } from '/src/config/firebase'

export const getAssociatedLists = async userID => {
  // Get document of given user
  const user = await getDoc(doc(db, 'users', userID))
  const { associatedListIDs } = user.data()

  // Find documents that the user is associated with
  const listsRef = collection(db, 'lists')
  const q = query(listsRef, where(documentId(), 'in', associatedListIDs))
  const docs = await getDocs(q)

  // Extract list data
  let associatedLists = []
  docs.forEach(doc => associatedLists.push({ ...doc.data(), listID: doc.id }))
  return associatedLists
}