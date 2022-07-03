import { Main, Header } from '/src/components'
import { useParams } from 'react-router-dom'
import { useUserStore, useListStore } from '/src/stores'
import { auth } from '/src/config/firebase'
import { Navigate } from 'react-router-dom'
import ListItem from './components/ListItem'

const List = () => {
  const { id } = useParams()
  const { associatedListIDs } = useUserStore()
  const { listID, name, items } = useListStore()
  console.log('hopefully loaded list = ', listID, name, items);


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
    <Header>{name}</Header>
    {items && items.map(item => <ListItem item={item} key={item.itemID}></ListItem>)}
  </Main>
}

export default List