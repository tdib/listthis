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
  SaveButton,
} from './itemPopupStyle'
import useListStore from '../../stores/useListStore'

import { createOrUpdateItem } from '../../services/items'
import debounce from 'lodash.debounce'

const AddItemPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, watch } = useForm()
  let watchName = watch('name')
  const addItem = useListStore(s => s.addItem)

  const onSubmit = data => {
    addItem({
      id: crypto.randomUUID(),
      name: data.name,
      note: data.note,
      imageURL: null,
      isChecked: false,
      dateAdded: new Date().toISOString(),
      authorID: 'dib',
    })
    // createOrUpdateItem({
    //   id: crypto.randomUUID(),
    //   name: data.name,
    //   note: data.note,
    //   imageURL: null,
    //   isChecked: false,
    //   dateAdded: new Date().toISOString(),
    //   authorID: 'dib',
    // })
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
