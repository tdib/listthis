import { PopupPanel, CloseButtonContainer, TitleField, InputContainer, Container } from './popupStyle'

import { Button } from '/src/components'
import { createListDB, auth } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'
import { X, ListPlus } from 'lucide-react'
import { createPortal } from 'react-dom'


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

  return createPortal(<Container onClick={(e) => e.currentTarget === e.target && closeFn()}>
    <PopupPanel onSubmit={handleSubmit(createNewListFn)}>
      <InputContainer>
        <TitleField
          placeholder='Enter a list name'
          required={true}
          autoFocus={true}
          autoComplete='off'
          {...register('listName')} />
        <Button disabled={!listName} type='submit' icon={<ListPlus />}>Create list</Button>
      </InputContainer>

      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>
    </PopupPanel>
  </Container>,
  document.body)
}

export default NewListPopup