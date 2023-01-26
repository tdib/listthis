import { CardsContainer, HeaderContainer, HeaderButtonContainer, InfoContainer } from './listSelectionStyle'
import ListCard from './components/ListCard/ListCard'

import { auth, getAllLists, leaveListDB } from '/src/services'
import { Main, Header, Modal, NewListPopup, TabBar, InfoMessage, Button } from '/src/components'
import { useListsStore } from '/src/stores'

import { useState, useEffect } from 'react'
import { useNavigate, Navigate } from 'react-router-dom'
import { onAuthStateChanged, signOut } from 'firebase/auth'
import { Lightbulb, LogOut } from 'lucide-react'

const ListSelection = () => {
  const navigate = useNavigate()
  const { lists, loadLists } = useListsStore()
  const [newListPopupOpen, setNewListPopupOpen] = useState(false)
  const [warningModalOpen, setWarningModalOpen] = useState(false)
  const [listToLeaveUID, setListToLeaveUID] = useState()
  const leaveList = useListsStore(s => s.leaveList)

  // Ensure current list UID is null on page (applicable on refreshes)
  const setCurrListUID = useListsStore(s => s.setCurrListUID)
  useEffect(() => {
    setCurrListUID(null)
  }, [])

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.log('kicking user off lists (back to login)');
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

  const toggleTheme = () => {
    const currTheme = localStorage.getItem('listthis-theme')
    const otherTheme = currTheme === 'dark' ? 'light' : 'dark'
    localStorage.setItem('listthis-theme', otherTheme)
    // document.querySelector('#app').classList.toggle('light')
    document.body.classList.toggle('light')
  }

  return <>
    <Main>
      <HeaderContainer>
        <Header>Your lists</Header>
        <div>
          <HeaderButtonContainer title='Toggle light mode' onClick={toggleTheme}>
            <Lightbulb />
          </HeaderButtonContainer>
          <HeaderButtonContainer title='Log out' onClick={() => {
            signOut(auth)
            navigate('/login')
          }}>
            <LogOut />
          </HeaderButtonContainer>
        </div>
      </HeaderContainer>

      {lists?.length ? (
        <CardsContainer>
          {lists.map(list => <ListCard
            key={list.listUID}
            data={list}
            openWarningFn={() => {
              setWarningModalOpen(true)
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
      {warningModalOpen && <Modal 
        header={'Leave this list?'}
        // TODO: list name
        description={'Are you sure you would like to leave this list? This action cannot be undone.'}
        buttons={[
          <Button key={0} style={{ flex: 1 }} $secondary onClick={() => {
            setListToLeaveUID()
            setWarningModalOpen(false)
          }}>Cancel</Button>,
          <Button key={1} style={{ flex: 1 }} onClick={() => {
            // Remove user from firestore list
            leaveListDB({ UUID: auth.currentUser.uid, listUID: listToLeaveUID })
            // Remove user from zustand store list
            leaveList(listToLeaveUID)
            setWarningModalOpen(false)
          }}>Leave</Button>
        ]}
      />}
    </Main>
    <TabBar title='Create new list' clickFn={() => setNewListPopupOpen(true)} />
  </>
}

export default ListSelection

