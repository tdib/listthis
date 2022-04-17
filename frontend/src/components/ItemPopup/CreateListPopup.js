import React, { useState, useEffect } from 'react'
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
  ButtonContainer,
} from './itemPopupStyle'
import useListsStore from '../../stores/useListsStore'
import { associateUserWithList, createNewList, getListByID } from '../../services/lists'
import useUserStore from '../../stores/useUserStore'

const CreateListPopup = ({ isOpen, onClose }) => {
  const { register, handleSubmit, watch } = useForm()
  let watchName = watch('name')
  const createList = useListsStore(s => s.createList)
  const loggedInUserID = useUserStore(s => s.userID)
  const [isCreating, setIsCreating] = useState(true)

  const onSubmit = data => {
    if (isCreating) {
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
    } else {
      getListByID(data.name).then(list => {
        createList(list)
        associateUserWithList({ userID: loggedInUserID, listID: data.name }).then(res => console.log(res))
      })
    }
  }

  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <AddItemForm onSubmit={handleSubmit(onSubmit)}>
          <TitleField
            name={'name'}
            type={'text'}
            placeholder={isCreating ? 'Type a list name' : 'Type the list ID to join'}
            required={true}
            {...register('name')}
          />
          <ButtonContainer>
            <SaveButton
              value={isCreating ? 'Join Existing' : 'Create New'}
              onClick={() => setIsCreating(!isCreating)}
            ></SaveButton>
            <SaveButton value={'Save'} type={'submit'} disabled={!watchName} onClick={onClose}></SaveButton>
          </ButtonContainer>
        </AddItemForm>
        <CloseButton onClick={onClose} doDisplay={isOpen}>
          <XIcon />
        </CloseButton>
      </Panel>
    </PanelWrapper>
  )
}

export default CreateListPopup
