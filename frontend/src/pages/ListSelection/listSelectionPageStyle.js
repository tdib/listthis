import styled from 'styled-components'
import { LogOut } from 'lucide-react'

export const TitleWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`

export const Title = styled.h1`
  color: ${p => p.theme.textPrimary};
  margin: 0;
`

export const LogoutButton = styled(LogOut)`
  :hover {
    color: ${p => p.theme.tertiary};
    cursor: pointer;
  }
`
