import { CardsContainer, HeaderContainer, InfoMessage } from './listSelectionStyle'
import ListCard from './components/ListCard/ListCard'
import { LogOut } from 'lucide-react'
import { auth } from '/src/config/firebase'
import { Main, Header } from '/src/components'
import { signOut } from 'firebase/auth'
import { useNavigate, Navigate } from 'react-router-dom'
import { useUserStore, useListsStore } from '/src/stores'
import { getAssociatedLists } from '/src/services'

const LogOutStyle = {
  color: 'var(--text-secondary)',
  'alignSelf': 'center',

  '&:hover': {
    background: 'white',
    color: 'red',
  },
}

const ListSelection = () => {
  const navigate = useNavigate()
  const { unloadUser } = useUserStore()
  const { lists, loadLists } = useListsStore()
  console.log('lists', lists);

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
      <LogOut style={LogOutStyle} onClick={() => {
        signOut(auth)
        unloadUser()
        navigate('/login')
      }} /> 
    </HeaderContainer>
    <CardsContainer>
      {lists ? (lists.map(list => <ListCard data={list} key={list.listID} />)) : (
        <InfoMessage>
        You are not in any lists! Create one by clicking the '+' button at the bottom of the screen!
        </InfoMessage>
      )
      }
      {/* <ListCard text='Family list'></ListCard>
      <ListCard text='Personal'></ListCard>
      <ListCard text='Birthday Picnic at the Park'></ListCard>
      <ListCard text='Reallyreallyreallyreallyreallylongword'></ListCard>
      <ListCard text='Another list'></ListCard> */}

    </CardsContainer>

  </Main>
}

export default ListSelection

