import React, { useState, useEffect } from 'react'
import { v4 as uuid } from 'uuid'
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
  const { createList } = useListsStore()
  const { userID, addAssociatedList, associatedListIDs } = useUserStore()
  const [isCreating, setIsCreating] = useState(true)

  const onSubmit = data => {
    if (isCreating) {
      const newList = {
        listID: uuid(),
        name: data.name,
        items: [],
      }

      // Add associated list to user store for client side access
      addAssociatedList(newList)

      // Create list in zustand store for live render
      createList(newList)

      // Create list in database
      createNewList({ listID: newList.listID, listName: newList.name, userID })
    } else {
      getListByID(data.name).then(list => {
        // Add associated list to user store for client side access
        addAssociatedList(list)

        // Create list in zustand store for live render
        createList(list)

        // Add list to associated lists in database
        associateUserWithList({ userID, listID: data.name }).then(res => console.log('RES', res))
      })
    }
  }

  return (
    <PanelWrapper dimBackground={isOpen}>
      <Panel isOpen={isOpen}>
        <AddItemForm onSubmit={handleSubmit(onSubmit)}>
          <TitleField
            autoComplete={'off'}
            name={'name'}
            type={'text'}
            placeholder={isCreating ? 'Type a list name' : 'Type the list ID to join'}
            required={true}
            {...register('name')}
          />
          <ButtonContainer>
            <SaveButton
              value={isCreating ? 'Join Existing' : 'Create New'}
              readOnly={true}
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
