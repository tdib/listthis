import { Main, Header } from '/src/components'
import { useParams } from 'react-router-dom'
import { useUserStore, useListStore } from '/src/stores'
import { auth } from '/src/services'
import { Navigate, useNavigate } from 'react-router-dom'
import ListItem from './components/ListItem'
import { HeaderContainer, BackButton } from './listStyle'

const List = () => {
  const { id } = useParams()
  const navigate = useNavigate()
  const { associatedListIDs } = useUserStore()
  const { listID, name, items } = useListStore()


  if (!auth.currentUser) {
    console.log('You are not logged in');
    return <Navigate to='/login' />
  }

  if (!associatedListIDs.includes(id)) {
    console.log('YOU ARE NOT ALLOWED TO VIEW THIS');
    return <Navigate to='/lists' />
  }

  // TODO: refresh case (list store doesn't have data)

  return <Main>
    <HeaderContainer>
      <BackButton onClick={() => navigate('/lists')}/>
      <Header>{name}</Header>
    </HeaderContainer>
    {items && items.map(item => <ListItem item={item} key={item.itemID}></ListItem>)}
  </Main>
}

export default List