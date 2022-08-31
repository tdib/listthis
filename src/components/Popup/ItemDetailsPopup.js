import {
  PopupPanel,
  CloseButtonContainer,
  Shadow,
  TitleField,
  NoteField,
} from './popupStyle'

import { Button, Header, Subheader } from '/src/components'
import { addItemDB, auth, getUserRecord } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'
import { X } from 'lucide-react'
import { Timestamp } from 'firebase/firestore'
import dayjs from 'dayjs'


const ItemDetailsPopup = ({ item, closeFn }) => {
  const { register, handleSubmit, watch } = useForm()
  // const addItem = useListStore(s => s.addItem)
  const upsertList = useListsStore(s => s.upsertList)
  const currList = useListsStore(s => s.getCurrList)()
  const { lists } = useListsStore()
  const itemName = watch('name')
  const { authorUID, dateAdded, imageURL, isChecked, itemUID, name, note } = item

  const createNewItemFn = (data) => {
    const item = {
      ...data,
      isChecked: false,
      itemUID: crypto.randomUUID(),
      imageURL: null,
    }

    // Add new item in firestore
    addItemDB({ item, listUID })
    // Add new item in lists store
    upsertList({ listUID, associatedUUIDs, name, items: [ ...items, item ]})

    // Close popup
    closeFn()
  }

  const dateAddedTimestamp = new Timestamp(dateAdded.seconds, dateAdded.nanoseconds).toDate()
  // console.log(getUserRecord(authorUID))

  return <>
    <PopupPanel>
      <Header>{name}</Header>
      <Subheader>Item added by {authorUID} on {dayjs(dateAddedTimestamp).format('dddd, D MMMM')}</Subheader>
      <NoteField readOnly={true} defaultValue={note} />
      {/* <Button disabled={!itemName} type='submit'>Add item</Button> */}
      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>
    </PopupPanel>
    <Shadow onClick={closeFn} />
  </>
}

export default ItemDetailsPopup