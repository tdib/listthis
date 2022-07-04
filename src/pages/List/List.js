import { HeaderContainer, BackButton } from './listStyle'
import ListItem from './components/ListItem'

import { Main, Header, TabBar, NewItemPopup, InfoMessage } from '/src/components'
import { useListStore } from '/src/stores'
import { auth } from '/src/services'

import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useState } from 'react'

const List = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { listID, name, items } = useListStore()
  const [popupOpen, setPopupOpen] = useState(false)

  if (!auth.currentUser) {
    console.log('You are not logged in');
    return <Navigate to='/login' />
  }

  // TODO: user not allowed to view list
  // if (!associatedListIDs.includes(id)) {
  //   console.log('YOU ARE NOT ALLOWED TO VIEW THIS');
  //   return <Navigate to='/lists' />
  // }

  // TODO: refresh case (list store doesn't have data)

  return <Main>
    <HeaderContainer>
      <BackButton onClick={() => navigate('/lists')}/>
      <Header>{name}</Header>
    </HeaderContainer>
    {items.length ? (
      items.map(item => <ListItem item={item} key={item.itemID}></ListItem>)
    ) : (
      <InfoMessage>There are no items in this list. You can add items by pressing on the "+" button at the bottom of the screen!</InfoMessage>
    )}

    {popupOpen && <NewItemPopup closeFn={() => setPopupOpen(false)} />}
    <TabBar clickFn={() => setPopupOpen(true)}/>
  </Main>
}

export default List