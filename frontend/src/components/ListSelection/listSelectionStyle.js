import styled from 'styled-components'

export const TileGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
  align-self: center;
`

export const InfoMessage = styled.span`
  color: ${p => p.theme.quaternary};
  text-align: center;
  align-self: center;
  margin-bottom: 20vh;
`
