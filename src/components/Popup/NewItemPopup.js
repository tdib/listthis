import {
  PopupPanel,
  CloseButtonContainer,
  InputContainer,
  TitleField,
  ButtonsContainer,
  NoteField,
  Container,
  ImagePreview,
} from './popupStyle'

import { Button } from '/src/components'
import { addItemDB, auth } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'
import { X, ImagePlus, Plus, Trash2 } from 'lucide-react'
import { createPortal } from 'react-dom'
import { useRef, useState } from 'react'



const NewItemPopup = ({ closeFn }) => {
  const { register, handleSubmit, watch } = useForm()
  // const addItem = useListStore(s => s.addItem)
  const upsertList = useListsStore(s => s.upsertList)
  const currList = useListsStore(s => s.getCurrList)()
  const { name, items, listUID, associatedUUIDs } = currList
  const { lists } = useListsStore()
  const itemName = watch('name')

  // Reference to hidden file input
  const hiddenFileInput = useRef()
  const [uploadedImg, setUploadedImg] = useState(null)

  const createNewItemFn = (data) => {
    const item = {
      ...data, // name and note
      authorUID: auth.currentUser.uid,
      dateAdded: new Date(),
      isChecked: false,
      itemUID: crypto.randomUUID(),
      imageURL: uploadedImg,
    }

    // Add new item in firestore
    addItemDB({ item, listUID })
    // Add new item in lists store
    upsertList({ listUID, associatedUUIDs, name, items: [ ...items, item ]})

    // Close popup
    closeFn()
  }

  return createPortal(<Container onClick={(e) => e.currentTarget === e.target && closeFn()}>
    <PopupPanel onSubmit={handleSubmit(createNewItemFn)}>
      <InputContainer>
        <TitleField
          placeholder='Enter an item name'
          required={true}
          autoFocus={true}
          autoComplete='off'
          {...register('name')} />
        <NoteField {...register('note')} />

        {uploadedImg && <ImagePreview src={uploadedImg} />}

        <ButtonsContainer>
          {/* Logic for attaching an image */}
          {uploadedImg
            ? <Button icon={<Trash2 />} onClick={() => setUploadedImg()}>Remove image</Button>
            : <Button icon={<ImagePlus />} onClick={() => hiddenFileInput.current.click()}>Attach image</Button>
          }
          <input
            id={'attach-img'}
            type={'file'}
            accept={'image/*'}
            ref={hiddenFileInput}
            onChange={(e) => {
              const reader = new FileReader()
              reader.onloadend = () => {
                setUploadedImg(reader.result)
              }
              reader.readAsDataURL(e.target.files[0])
            }}
            style={{display: 'none'}}
          />
          <Button disabled={!itemName} type='submit' icon={<Plus />}>Add item</Button>
        </ButtonsContainer>
      </InputContainer>

      <CloseButtonContainer title='Close panel' onClick={closeFn}>
        <X />
      </CloseButtonContainer>
    </PopupPanel>
  </Container>,
  document.body)
}

export default NewItemPopup