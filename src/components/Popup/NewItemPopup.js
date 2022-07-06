import {
  PopupPanel,
  CloseButtonContainer,
  Shadow,
  TitleField,
  NoteField,
} from './popupStyle'

import { Button } from '/src/components'
import { addItemDB, auth } from '/src/services'
import { useListsStore, useListStore } from '/src/stores'

import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'


const NewItemPopup = ({ closeFn }) => {
  const { register, handleSubmit, watch } = useForm()
  const addItem = useListStore(s => s.addItem)
  const upsertList = useListsStore(s => s.upsertList)
  const { lists } = useListsStore()
  const { listUID, associatedUUIDs, name, items } = useListStore()
  const itemName = watch('name')

  const createNewItemFn = (data) => {
    const item = {
      ...data,
      isChecked: false,
      itemUID: crypto.randomUUID(),
      imageURL: null,
    }

    // Add new item in firestore
    addItemDB({ item, listUID })
    // Add new item in current list store
    addItem(item)
    // Add new item in lists store
    upsertList({ listUID, associatedUUIDs, name, items: [ ...items, item ]})

    // Close popup
    closeFn()
  }

  return <>
    <PopupPanel onSubmit={handleSubmit(createNewItemFn)}>
      <TitleField
        placeholder='Enter an item name'
        required={true}
        autoFocus={true}
        autoComplete='off'
        {...register('name')} />
      <NoteField {...register('note')} />
      <Button disabled={!itemName} type='submit'>Add item</Button>
      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>
    </PopupPanel>
    <Shadow onClick={closeFn} />
  </>
}

export default NewItemPopup