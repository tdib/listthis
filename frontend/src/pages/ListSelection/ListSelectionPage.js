import React from 'react'
import { ListSelection, TabBar } from '../../components'
import { useListStore, useUserStore, useListsStore } from '../../stores'
import { Navigate, useNavigate } from 'react-router-dom'
import { TitleWrapper, Title, LogoutButton } from './listSelectionPageStyle'

const ListSelectionPage = () => {
  const { userID, unloadUser } = useUserStore()
  const { unloadList } = useListStore()
  const { unloadLists } = useListsStore()

  const handleLogout = () => {
    unloadUser()
    unloadList()
    unloadLists()
    return <Navigate to={'/login'} />
  }

  if (!userID) {
    console.log('NOT AUTHORISED')
    return <Navigate to='/login' />
  }

  return (
    <>
      <TitleWrapper>
        <Title>Your lists</Title>
        <LogoutButton onClick={handleLogout} />
      </TitleWrapper>
      <ListSelection />
    </>
  )
}

export default ListSelectionPage
