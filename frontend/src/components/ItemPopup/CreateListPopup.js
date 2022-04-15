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
import useListsStore from '../../stores/useListsStore'
import { createNewList } from '../../services/lists'
import useUserStore from '../../stores/useUserStore'

const CreateListPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, watch } = useForm()
  let watchName = watch('name')
  const createList = useListsStore(s => s.createList)
  const loggedInUserID = useUserStore(s => s.userID)

  const onSubmit = data => {
    // TODO: associate list with logged in user
    const newList = {
      listID: crypto.randomUUID(),
      name: data.name,
      items: [],
    }

    // Create list in zustand store for live render
    createList(newList)

    // Create list in database
    createNewList({ listID: newList.listID, listName: newList.name, userID: loggedInUserID })
  }

  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <AddItemForm onSubmit={handleSubmit(onSubmit)}>
          <TitleField
            name={'name'}
            type={'text'}
            placeholder={'Type a list name'}
            required={true}
            {...register('name')}
          />
          <SaveButton value={'Save'} type={'submit'} disabled={!watchName} onClick={onClose}></SaveButton>
        </AddItemForm>
        <CloseButton onClick={onClose} doDisplay={isOpen}>
          <XIcon />
        </CloseButton>
      </Panel>
    </PanelWrapper>
  )
}

export default CreateListPopup
