import {
  collection,
  addDoc,
  setDoc,
  getDocs,
  doc,
  firebase,
  firestore,
  FieldValue,
  updateDoc,
  update,
  getDoc,
  query,
  where,
  documentId,
  FieldValue,
  doc,
  arrayRemove,
  deleteDoc,
  arrayUnion,
  Timestamp
} from 'firebase/firestore'
import { listsRef, db, auth } from './firebase'

export const getAssociatedLists = async UUID => {
  // Find documents that the user is associated with
  const q = query(listsRef, where('associatedUUIDs', 'array-contains', UUID))
  const docs = await getDocs(q)

  // Extract list data
  let associatedLists = []
  docs.forEach(doc => associatedLists.push({ ...doc.data(), listUID: doc.id }))
  return associatedLists
}

export const createListDB = async list => {
  return await addDoc(listsRef, {...list})
}

export const leaveListDB = async ({ UUID, listUID }) => {
  // Remove user from given list
  const listToLeaveRef = doc(db, 'lists', listUID)
  await updateDoc(listToLeaveRef, {
    associatedUUIDs: arrayRemove(UUID)
  })

  // Delete list from database if the given user was the last to leave
  const { associatedUUIDs } = (await getDoc(listToLeaveRef)).data()
  if (associatedUUIDs.length === 0) {
    await deleteDoc(listToLeaveRef)
  }
}

// Send an item to a given list in Firestore
export const addItemDB = async ({ item, listUID }) => {
  const listRef = doc(db, 'lists', listUID)
  await updateDoc(listRef, {
    items: arrayUnion(item)
  })
}

export const getList = async (listUID) => {
  const listDoc = await getDoc(doc(db, 'lists', listUID))
  return listDoc.data()
}

export const getAllLists = async () => {
  const q = query(collection(db, 'lists'))
  const allListsDocs = await getDocs(q)
  let allLists = []
  allListsDocs.forEach(doc => allLists.push({ ...doc.data(), listUID: doc.id }))
  return allLists
}

// Given a list, update the list with the corresponding ID in firestore
export const upsertListDB = async (list) => {
  await setDoc(doc(db, 'lists', list.listUID), {
    ...list
  })
}