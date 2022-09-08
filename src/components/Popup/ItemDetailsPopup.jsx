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
import Modal from './Modal'
import { useEffect, useState } from 'react'


const ItemDetailsPopup = ({ item, closeFn }) => {
  const { register, handleSubmit, watch } = useForm()
  // const addItem = useListStore(s => s.addItem)
  const upsertList = useListsStore(s => s.upsertList)
  const currList = useListsStore(s => s.getCurrList)()
  const { lists } = useListsStore()
  const itemName = watch('name')
  const { authorUID, dateAdded, imageURL, isChecked, itemUID, name, note } = item
  console.log('our item is', item);
  const [displayName, setDisplayName] = useState()

  useEffect(() => {
    const getAuthorDisplayName = async () => {
      const authorUser = await getUserRecord(authorUID)
      
      setDisplayName(authorUser.displayName)
    }
    getAuthorDisplayName()
  }, [authorUID])

  const [deleteModalOpen, setDeleteModalOpen] = useState()

  // TODO: why is this here?
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

  const deleteItem = () => {
    const newList = {
      ...currList,
      items: currList.items.filter((currItem) => currItem.itemUID !== item.itemUID)
    }
    upsertList(newList)
    setDeleteModalOpen(false)
  }
  


  const dateAddedTimestamp = dayjs(new Date(dateAdded)).format('dddd, D MMMM')


  // if (deleteModalOpen) {
  //  return 
  // }

  // return createPortal(
  return createPortal(<>
  <Container onClick={(e) => e.currentTarget === e.target && closeFn()}>
    <PopupPanel>
      <InputContainer>
        <Header>{name}</Header>
        <Subheader>Item added by {displayName ?? 'Unknown User'} on {dateAddedTimestamp}</Subheader>
        <NoteField readOnly={true} defaultValue={note} />
        {<ImagePreview src={imageURL} />}
        <ButtonsContainer style={{ justifyContent: 'left'}}>
          <Button $warning icon={<Trash2 />} onClick={() => setDeleteModalOpen(true)}>Delete item</Button>
        </ButtonsContainer>
      </InputContainer>

      <div>
      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>

      </div>
    </PopupPanel>
  </Container>

  {deleteModalOpen && 
    <Modal
      header='Delete this item?'
      description='Are you sure you would like to delete this item? This action cannot be undone.'
      buttons={[
        <Button $secondary onClick={() => setDeleteModalOpen(false)}>Cancel</Button>,
        <Button onClick={deleteItem}>Confirm</Button>
      ]}
    />
  }
  </>,
  document.body)
}

export default ItemDetailsPopup