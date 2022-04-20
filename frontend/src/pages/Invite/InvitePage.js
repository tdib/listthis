import React, { useEffect, useState } from 'react'
import { useParams, useNavigate, Navigate, useLocation } from 'react-router-dom'

import { Container, Title, ButtonWrapper, Button } from './invitePageStyle.js'

import { TailSpin } from 'react-loader-spinner'
import { getListByInviteID } from '../../services/invites.js'
import { useListsStore, useUserStore } from '../../stores'
import { associateUserWithList } from '../../services/lists.js'

const InvitePage = () => {
  const { inviteID } = useParams()
  const [inviteList, setInviteList] = useState()
  const [error, setError] = useState()
  const { userID, addAssociatedList } = useUserStore()
  const { lists, createList } = useListsStore()
  const navigate = useNavigate()

  useEffect(() => {
    getListByInviteID(inviteID)
      .then(list => {
        if (list.isValid === false) {
          setError('This invite link does not exist or has expired.')
        } else {
          setInviteList(list)
        }
      })
      .catch(err => console.log(err))
  }, [])

  if (!userID) {
    return <Navigate to='/login' state={{ returnURL: window.location.pathname }} />
  }

  const handleJoinInvite = () => {
    // Add associated list to user store for client side access
    addAssociatedList(inviteList)

    // Associate user with list on backend
    associateUserWithList({ userID, listID: inviteList.listID })
    navigate('/lists', {
      state: { returnURL: window.location.href },
    })
  }

  const handleHomeButton = () => {
    navigate('/lists')
  }

  if (error) {
    return (
      <Container>
        <Title>{error}</Title>
        <ButtonWrapper>
          <Button onClick={handleHomeButton}>Home</Button>
        </ButtonWrapper>
      </Container>
    )
  }

  return (
    <Container>
      {!inviteList ? (
        <TailSpin color='white' />
      ) : (
        <>
          <Title>You have been invited to join "{inviteList.name}"!</Title>
          <ButtonWrapper>
            <Button onClick={handleHomeButton}>Home</Button>
            <Button onClick={handleJoinInvite}>Join</Button>
          </ButtonWrapper>
        </>
      )}
    </Container>
  )
}

export default InvitePage
