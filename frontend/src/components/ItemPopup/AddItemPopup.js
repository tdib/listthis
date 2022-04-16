import React, { useEffect, useState } from 'react'
import { useForm } from 'react-hook-form'

import {
  PanelWrapper,
  Panel,
  AddItemForm,
  CloseButton,
  XIcon,
  TitleField,
  NoteHeading,
  NoteSection,
  AddImageButton,
  SaveButton,
  NoteWrapper,
  ImgPreview,
} from './itemPopupStyle'
import useListStore from '../../stores/useListStore'

import { createItem, uploadImg } from '../../services/items'

const AddItemPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, watch } = useForm()
  let watchName = watch('name')
  let watchImg = watch('image')
  const [noteText, setNoteText] = useState()
  const { listID, addItem } = useListStore()
  const [uploadedImg, setUploadedImg] = useState()
  const [uploadedImgPreview, setUploadedImgPreview] = useState()

  useEffect(() => {
    if (isOpen) {
      // TODO: Reset inputs before opening
    }
  }, [isOpen])

  useEffect(() => {
    if (watchImg && watchImg[0]) {
      const reader = new FileReader()
      reader.onloadend = () => {
        setUploadedImgPreview(reader.result)
        setUploadedImg(watchImg[0])
      }
      reader.readAsDataURL(watchImg[0])
    } else {
      setUploadedImgPreview(null)
    }
  }, [watchImg])

  const onSubmit = async data => {
    let imageURL = null
    if (uploadedImg) {
      const imgID = crypto.randomUUID()
      imageURL = await uploadImg({ imgID, img: uploadedImg })
    }

    const newItem = {
      itemID: crypto.randomUUID(),
      name: data.name,
      // note: data.note,
      note: noteText,
      imageURL: imageURL,
      isChecked: false,
      dateAdded: new Date().toISOString(),
      authorID: 'dib',
    }

    // Add new item to zustand list store
    addItem(newItem)
    createItem({ listID, item: newItem })
  }

  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <AddItemForm onSubmit={handleSubmit(onSubmit)}>
          <TitleField
            name={'name'}
            type={'text'}
            placeholder={'Type an item name'}
            required={true}
            {...register('name')}
          />
          <NoteWrapper>
            <NoteHeading>Note</NoteHeading>
            {/* <NoteSection name={'note'} type={'textarea'} placeholder={'Type a note'} {...register('note')} /> */}
            <NoteSection
              name={'note'}
              role={'textbox'}
              contentEditable
              onInput={e => {
                setNoteText(e.target.innerText)
              }}
              {...register('note', noteText)}
            />
          </NoteWrapper>
          <AddImageButton name={'image'} type={'file'} accept={'image/*'} {...register('image')} />
          {uploadedImgPreview && <ImgPreview src={uploadedImgPreview} />}
          <SaveButton value={'Save'} type={'submit'} disabled={!watchName} onClick={onClose}></SaveButton>
        </AddItemForm>
        <CloseButton onClick={onClose} doDisplay={isOpen}>
          <XIcon />
        </CloseButton>
      </Panel>
    </PanelWrapper>
  )
}

export default AddItemPopup
