import {
  PopupPanel,
  Container,
  CloseButtonContainer,
  NoteField,
  InputContainer,
  ImagePreview,
  ButtonsContainer,
} from './popupStyle'

import { Button, Header, Subheader } from '/src/components'
import { addItemDB, auth, getUserRecord } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'
import { Trash2, X } from 'lucide-react'
import { createPortal } from 'react-dom'
import dayjs from 'dayjs'


const ItemDetailsPopup = ({ item, closeFn }) => {
  const { register, handleSubmit, watch } = useForm()
  // const addItem = useListStore(s => s.addItem)
  const upsertList = useListsStore(s => s.upsertList)
  const currList = useListsStore(s => s.getCurrList)()
  const { lists } = useListsStore()
  const itemName = watch('name')
  const { authorUID, dateAdded, imageURL, isChecked, itemUID, name, note } = item
  console.log('our item is', item);

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

  const dateAddedTimestamp = dayjs(new Date(dateAdded)).format('dddd, D MMMM')
  // console.log('GETTING USER RECORD', getUserRecord(authorUID))

  return createPortal(<Container onClick={(e) => e.currentTarget === e.target && closeFn()}>
    <PopupPanel>
      <InputContainer>
        <Header>{name}</Header>
        <Subheader>Item added by {authorUID} on {dateAddedTimestamp}</Subheader>
        <NoteField readOnly={true} defaultValue={note} />
        {<ImagePreview src={imageURL} />}
        <ButtonsContainer style={{ justifyContent: 'left'}}>
          <Button icon={<Trash2 />} $warning>Delete item</Button>
        </ButtonsContainer>
      </InputContainer>

      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>
    </PopupPanel>
  </Container>,
  document.body)
}

export default ItemDetailsPopup