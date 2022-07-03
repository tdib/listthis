import { CardsContainer, HeaderContainer } from './listSelectionStyle'
import ListCard from './components/ListCard/ListCard'
import { LogOut } from 'lucide-react'

import { Main, Header,  Subheader, ErrorWarning } from '/src/components'

const LogOutStyle = {
  color: 'var(--text-secondary)',
  'align-self': 'center',

  '&:hover': {
    background: 'white',
    color: 'red',
  },
}

const ListSelection = () => {
  return <Main>
    <HeaderContainer>
      <Header>Your lists</Header>
      <LogOut style={LogOutStyle} /> 
    </HeaderContainer>
    <CardsContainer>
      <ListCard text='Family list'></ListCard>
      <ListCard text='Personal'></ListCard>
      <ListCard text='Birthday Picnic at the Park'></ListCard>
      <ListCard text='Reallyreallyreallyreallyreallylongword'></ListCard>
      <ListCard text='Another list'></ListCard>

    </CardsContainer>

  </Main>
}

export default ListSelection

