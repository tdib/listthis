import { CardsContainer, HeaderContainer, LogOutButtonContainer, InfoContainer } from './listSelectionStyle'
import ListCard from './components/ListCard/ListCard'

import { auth, getAllLists, leaveListDB } from '/src/services'
import { Main, Header, WarningPopup, NewListPopup, TabBar, InfoMessage, Button } from '/src/components'
import { useListsStore } from '/src/stores'

import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { LogOut } from 'lucide-react'

const ListSelection = () => {
  const navigate = useNavigate()
  const { lists, loadLists } = useListsStore()
  const [newListPopupOpen, setNewListPopupOpen] = useState(false)
  const [warningPopupOpen, setWarningPopupOpen] = useState(false)
  const [listToLeaveUID, setListToLeaveUID] = useState()
  const leaveList = useListsStore(s => s.leaveList)
  const setCurrListUID = useListsStore(s => s.setCurrListUID)
  const curr = useListsStore(s => s.currListUID)
  const currList = useListsStore(s => s.getCurrList)()
  console.log('lists', lists);
  console.log('currUID', curr);
  console.log('currList (lists page)', currList);

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      return <Navigate to='/login' />
    }
  })

  // console.log(auth);
  // if (auth && !auth.currentUser) {
  //   console.log('No auth current user! navigating to login');
  //   return <Navigate to='/login' />
  // }

  if (lists === null) {
    console.log('lists == null, curruser', auth.currentUser);
    // getAssociatedLists(auth.currentUser.uid)
    //   .then(lists => loadLists(associatedLists))
  }

  // useEffect(() => {
  //   getAllLists().then(loadLists)//.then(y => console.log('y', y))
  // }, [])

  return <>
    <Main>
      <HeaderContainer>
        <Header>Your lists</Header>
        <LogOutButtonContainer title='Log out' onClick={() => {
          signOut(auth)
          navigate('/login')
        }}>
          <LogOut />
        </LogOutButtonContainer>
      </HeaderContainer>
        {lists?.length ? (
          <CardsContainer>
            {lists.map(list => <ListCard
              key={list.listUID}
              data={list}
              openWarningFn={() => {
                setWarningPopupOpen(true)
                setListToLeaveUID(list.listUID)
              }} 
            />)}
          </CardsContainer>
        ) : (
          <InfoContainer>
            <InfoMessage>There are no items in this list. You can add items by pressing on the "+" button at the bottom of the screen!</InfoMessage>
          </InfoContainer>
        )}
        {newListPopupOpen && <NewListPopup closeFn={() => setNewListPopupOpen(false)} />}
    {warningPopupOpen && <WarningPopup 
      header={'Leave this list?'}
      // TODO: list name
      description={'Are you sure you would like to leave this list? This action cannot be undone.'}
      buttons={[
        <Button style={{ flex: 1 }} $secondary onClick={() => {
          setListToLeaveUID()
          setWarningPopupOpen(false)
        }}>Cancel</Button>,
        <Button style={{ flex: 1 }} onClick={() => {
          // Remove user from firestore list
          leaveListDB({ UUID: auth.currentUser.uid, listUID: listToLeaveUID })
          // Remove user from zustand store list
          leaveList(listToLeaveUID)
          setWarningPopupOpen(false)
        }}>Leave</Button>
      ]} />}
    </Main>
    <TabBar title='Create new list' clickFn={() => setNewListPopupOpen(true)} />
  </>
}

export default ListSelection

