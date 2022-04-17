import React from 'react'
import { ListSelection, TabBar } from '../../components'
import { useUserStore } from '../../stores'
import { useNavigate } from 'react-router-dom'

export const ListSelectionPage = () => {
  const { userID } = useUserStore()
  const navigate = useNavigate()

  if (!userID) {
    console.log('NOT AUTHORISED')
    navigate('/login')
  }

  return (
    <>
      <ListSelection />
    </>
  )
}

export default ListSelectionPage
