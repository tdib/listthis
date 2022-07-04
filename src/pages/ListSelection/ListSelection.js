import { CardsContainer, HeaderContainer, LogOutButton, InfoContainer } from './listSelectionStyle'
import ListCard from './components/ListCard/ListCard'

import { auth } from '/src/services'
import { Main, Header, Button, NewListPopup, TabBar, InfoMessage } from '/src/components'
import { useListsStore } from '/src/stores'

import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { signOut } from 'firebase/auth'

const ListSelection = () => {
  const navigate = useNavigate()
  const { lists, loadLists } = useListsStore()
  const [popupOpen, setPopupOpen] = useState(false)

  if (!auth.currentUser) {
    console.log('No auth current user! navigating to login');
    return <Navigate to='/login' />
  }

  if (lists === null) {
    console.log('curruser', auth.currentUser);
    // getAssociatedLists(auth.currentUser.uid)
    //   .then(lists => loadLists(associatedLists))
  }

  return <Main>
    <HeaderContainer>
      <Header>Your lists</Header>
      <LogOutButton onClick={() => {
        signOut(auth)
        navigate('/login')
      }} />
    </HeaderContainer>
      {/* TODO: center on screen */}
      {lists.length ? (
        <CardsContainer>
          {lists.map(list => <ListCard data={list} key={list.listID} />)}
        </CardsContainer>
      ) : (
        <InfoContainer>
          <InfoMessage>
            You are not in any lists! Create one by clicking the button below!
          </InfoMessage>
          <Button onClick={() => setPopupOpen(true)}>
            Add list
          </Button>
        </InfoContainer>
      )}
      {popupOpen && <NewListPopup closeFn={() => setPopupOpen(false)} />}

      <TabBar clickFn={() => setPopupOpen(true)} />

  </Main>
}

export default ListSelection

