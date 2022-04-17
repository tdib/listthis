import styled from 'styled-components'

export const TileGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
`

export const InfoMessage = styled.span`
  color: ${p => p.theme.tertiary};
`
