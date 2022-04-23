import styled from 'styled-components'
import { X } from 'lucide-react'
import { Link } from 'react-router-dom'

export const CardContainer = styled.div`
  display: flex;
  width: 12rem;
  height: 12rem;
  border-radius: 1rem;
  background-color: ${p => p.theme.secondary};

  :hover {
    filter: brightness(1.15);
    cursor: pointer;
  }

  @media (prefers-color-scheme: light) {
    :hover {
      filter: brightness(0.925);
    }
  }
`

export const LinkWrapper = styled(Link)`
  text-decoration: none;
  width: 100%;
`

export const ListName = styled.p`
  margin: 1rem;
  font-weight: 500;
  font-size: 1.5rem;
  color: ${p => p.theme.textPrimary};
  overflow: hidden;
  overflow-wrap: break-word;
  user-select: none;
`

export const LeaveListButton = styled(X)`
  color: ${p => p.theme.tertiary};
  padding: 0.5rem;

  :hover {
    color: ${p => p.theme.quaternary};
  }
`
