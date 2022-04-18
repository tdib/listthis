import React, { useState } from 'react'

import { Header, ListItems } from '../../components'
// import { ListItems } from '../../components'
import { useListStore, useUserStore } from '../../stores'
// import { getListsByUserID, getListByID } from '../../services'
import { useParams } from 'react-router-dom'
// import Header from '../../components/Header/Header'
// import ListItems from '../../components/ListItem/ListItems'
import { useAsync } from '../../hooks'
import { getListByID, getListsByUserID } from '../../services/lists'
import { TailSpin } from 'react-loader-spinner'
import { Navigate } from 'react-router-dom'

// TODO: why does this import break
// import { UnauthorisedPage } from '../../pages'
import UnauthorisedPage from '../Unauthorised/UnauthorisedPage'

const ListPage = () => {
  const { userID, associatedListIDs } = useUserStore()
  const { loadList, listID: currListID } = useListStore()
  const { listID } = useParams()
  const [isLoading, setIsLoading] = useState(true)
  const [isAuthorised, setIsAuthorised] = useState(false)

  // User not logged in
  if (!userID) {
    return <Navigate to='/login' />
  }

  // Link accessed directly
  if (!currListID) {
    // Get logged in users lists
    getListsByUserID(userID)
      // Extract list IDs
      .then(listsByUserID => listsByUserID.map(list => list.listID))
      // Check if current user is associated with this list
      .then(listIDsByUser => {
        if (listIDsByUser.includes(listID)) {
          getListByID(listID).then(list => loadList(list))
          setIsAuthorised(true)
        }
        setIsLoading(false)
      })
  }

  if (isLoading) {
    return <TailSpin color='white' />
  }

  // if (isAuthorised) {
  if (associatedListIDs.includes(listID)) {
    return (
      <>
        <Header />
        <ListItems />
      </>
    )
  } else {
    return <UnauthorisedPage />
  }
}

export default ListPage
