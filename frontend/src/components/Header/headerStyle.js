import styled from 'styled-components'

export const HeaderContainer = styled.div`
  margin: 2rem;
`

export const Title = styled.h1`
  color: ${p => p.theme.textPrimary};
  margin-bottom: 0;
`

export const Subtitle = styled.span`
  color: ${p => p.theme.quaternary};
`

export const HRule = styled.hr`
  border-color: ${p => p.theme.quaternary};
`
