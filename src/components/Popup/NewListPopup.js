import { PopupPanel, CloseButton, TitleField, Shadow } from './popupStyle'

import { Button } from '/src/components'
import { createListDB, auth } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'

const createNewListFn = ({ listName }) => {
  const newList = {
    associatedUUIDs: [auth.currentUser.uid],
    name: listName,
    items: [],
  }
  // Create new list in firestore
  createListDB(newList)
    .then(() => {
      // TODO: create new list in zustand store
      // const { createList } = useListsStore()
      // createList(newList)
    })
  .catch(console.error)
}

const NewListPopup = ({ closeFn }) => {
  const { register, handleSubmit } = useForm()

  return <>
    <PopupPanel onSubmit={handleSubmit(createNewListFn)}>
      <TitleField
        placeholder='Enter a list name'
        required={true}
        autoFocus={true}
        autoComplete='off'
        {...register('listName')} />
      <CloseButton onClick={closeFn} />
      <Button type='submit'>Create list</Button>
    </PopupPanel>
    <Shadow />
  </>
}

export default NewListPopup