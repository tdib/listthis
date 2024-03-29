import { HeaderContainer, AllItemsContainer, BackButtonContainer } from './listStyle'
import ListItem from './components/ListItem'

import { Main, Header, TabBar, NewItemPopup, InfoMessage } from '/src/components'
import { auth, upsertListDB } from '/src/services'
import { useListsStore } from '/src/stores'

import { useParams, Navigate, useNavigate } from 'react-router-dom'
import { useEffect, useState, useCallback } from 'react'
import { onAuthStateChanged } from 'firebase/auth'
import { ChevronLeft } from 'lucide-react'
import { debounce } from 'lodash'

const List = () => {
  const { listUID } = useParams()
  const navigate = useNavigate()
  const [popupOpen, setPopupOpen] = useState(false)
  const setCurrListUID = useListsStore(s => s.setCurrListUID)
  // TODO: why does this need to be destructured like this?
  const { getCurrList } = useListsStore()
  const { name, items, associatedUUIDs } = getCurrList()
  const currList = {
    listUID,
    name,
    items,
    associatedUUIDs
  }

  // Update list in database after 2s of inactivity
  const debouncedListUpdate = useCallback(
    debounce((currList) => upsertListDB(currList), 2000), []
  )
  useEffect(() => {
    if (currList) {
      debouncedListUpdate(currList)
    }
  }, [currList])

  onAuthStateChanged(auth, (user) => {
    if (!user) {
      console.warn('You are not logged in. Navigating to login.');
      // TODO: why do i need both of these
      navigate('/login')
      return
      // return <Navigate to='/login' />
    }
  })

  // useEffect(() => {
    // getList(listUID)
      // .then(loadList)
    // console.log('fslist', firestoreList)
  // }, [])

  // TODO: user not allowed to view list
  // if (!associatedListIDs.includes(id)) {
  //   console.log('YOU ARE NOT ALLOWED TO VIEW THIS');
  //   return <Navigate to='/lists' />
  // }

  // TODO: refresh case (list store doesn't have data)

  return <>
    <Main>
      <HeaderContainer>
        <BackButtonContainer title='Back to all lists' onClick={() => {
          upsertListDB(currList)
          setCurrListUID(null)
          navigate('/lists')
        }}>
          <ChevronLeft />
        </BackButtonContainer>
        <Header>{name}</Header>
      </HeaderContainer>
      {items?.length ? (
        <AllItemsContainer>
          {items.map(item => <ListItem item={item} key={item.itemUID}></ListItem>)}
        </AllItemsContainer>
      ) : (
        <InfoMessage>There are no items in this list. You can add items by pressing on the "+" button at the bottom of the screen!</InfoMessage>
      )}

      {popupOpen && <NewItemPopup closeFn={() => setPopupOpen(false)} />}
    </Main>
    <TabBar clickFn={() => setPopupOpen(true)}/>
  </>
}

export default List