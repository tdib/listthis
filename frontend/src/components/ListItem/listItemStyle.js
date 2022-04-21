import styled from 'styled-components'
import { MoreVertical } from 'lucide-react'
import { Image } from 'lucide-react'

export const AllItemsContainer = styled.div`
  background-color: ${p => p.theme.primary};
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  margin-bottom: 2rem;
`

export const ListItemContainer = styled.div`
  display: flex;
  user-select: none;

  &:hover {
    background-color: ${p => p.theme.secondary};
    border-radius: 0.5rem;

    > button {
      transform: scale(1.1);
    }
  }

  > button {
    transform: scale(1);
    transition: transform 0.2s;
  }

  &:active > button {
    transform: scale(0.9);
  }
`

export const TextContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 85%;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
`

export const ItemName = styled.span`
  color: ${p => p.theme.textPrimary};
  display: inline-block;
`

export const SubLineWrapper = styled.div`
  display: flex;
  align-items: center;
`

export const ImageIcon = styled(Image)`
  color: ${p => p.theme.tertiary};
  margin-right: .25rem;
  margin-top: .2rem;
`

export const ItemNote = styled.span`
  display: inline-block;
  color: ${p => p.theme.quaternary};
  font-size: 0.85rem;
`

export const CheckBox = styled.button`
  align-self: center;
  border-style: solid;
  border-color: ${p => (p.checked ? p.theme.textPrimary : p.theme.quaternary)};
  border-width: 0.1rem;
  background: ${p => (p.checked ? p.theme.accentPrimary : 'none')};
  border-radius: 1rem;
  width: 1.5rem;
  height: 1.5rem;
  margin: 0.6rem;
`

export const MoreButton = styled(MoreVertical)`
  margin-left: auto;
  margin-right: 0.5rem;
  align-self: center;
  color: ${p => p.theme.tertiary};

  :hover {
    color: ${p => p.theme.quaternary};
  }

  :active {
    transform: scale(0.95);
  }
`
