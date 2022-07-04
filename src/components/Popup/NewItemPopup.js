import {
  PopupPanel,
  CloseButton,
  Shadow,
  TitleField,
  NoteField,
} from './popupStyle'

import { Button } from '/src/components'
import { addItemDB, auth } from '/src/services'
import { useListsStore } from '/src/stores'

import { useForm } from 'react-hook-form'

const createNewItemFn = (data) => {
  const item = {
    ...data,
    isChecked: false,
  }

  addItemDB({ item })
}

const NewItemPopup = ({ closeFn }) => {
  const { register, handleSubmit } = useForm()

  return <>
    <PopupPanel onSubmit={handleSubmit(createNewItemFn)}>
      <TitleField
        placeholder='Enter an item name'
        required={true}
        autoFocus={true}
        autoComplete='off'
        {...register('name')} />
      <CloseButton onClick={closeFn} />
      <NoteField
        {...register('note')}></NoteField>
      <Button type='submit'>Add item</Button>
    </PopupPanel>
    <Shadow />
  </>
}

export default NewItemPopup