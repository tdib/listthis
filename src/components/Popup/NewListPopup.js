import { PopupPanel, CloseButtonContainer, TitleField, Shadow } from './popupStyle'

import { Button } from '/src/components'
import { createListDB, auth } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'


const NewListPopup = ({ closeFn }) => {
  const { register, handleSubmit, watch } = useForm()
  const createList = useListsStore(s => s.createList)
  const listName = watch('listName')

  const createNewListFn = ({ listName }) => {
    const newList = {
      associatedUUIDs: [auth.currentUser.uid],
      name: listName,
      items: [],
    }
    // Create new list in firestore
    createListDB(newList)
      .then(({ id }) => {
        // TODO: create new list in zustand store
        createList({ ...newList, listUID: id })
      })
    .catch(console.error)
    closeFn()
  }

  return <>
    <PopupPanel onSubmit={handleSubmit(createNewListFn)}>
      <TitleField
        placeholder='Enter a list name'
        required={true}
        autoFocus={true}
        autoComplete='off'
        {...register('listName')} />
      <Button disabled={!listName} type='submit'>Create list</Button>
      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>
    </PopupPanel>
    <Shadow onClick={closeFn} />
  </>
}

export default NewListPopup