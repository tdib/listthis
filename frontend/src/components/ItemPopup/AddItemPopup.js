import React, { useEffect } from 'react'
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
} from './itemPopupStyle'
import useListStore from '../../stores/useListStore'

import { createItem } from '../../services/items'
import debounce from 'lodash.debounce'

const AddItemPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, watch } = useForm()
  let watchName = watch('name')
  const { listID, addItem } = useListStore()

  const onSubmit = data => {
    const newItem = {
      itemID: crypto.randomUUID(),
      name: data.name,
      note: data.note,
      imageURL: data.image,
      isChecked: false,
      dateAdded: new Date().toISOString(),
      authorID: 'dib',
    }

    console.log(newItem.imageURL);

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
          <AddImageButton name={'image'} type={'file'} {...register('image')} />
          <NoteHeading>Note</NoteHeading>
          <NoteSection name={'note'} type={'textarea'} placeholder={'Type a note'} {...register('note')} />
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
