import styled from 'styled-components'

export const Container = styled.div`
  /* background-color: blue; */
`

export const Title = styled.h1`
  color: ${p => p.theme.textPrimary};
  margin: 0;
`

export const TileGrid = styled.div`
  margin-top: 2rem;
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
  justify-content: flex-start;
`

export const InfoMessage = styled.span`
  color: ${p => p.theme.tertiary}
`
