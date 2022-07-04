import { TabBarContainer, AddButtonCircle, AddButtonPlus } from './tabBarStyle'

const TabBar = ({ clickFn }) => {
  return <TabBarContainer>
    <AddButtonCircle onClick={clickFn}>
      <AddButtonPlus />
    </AddButtonCircle>
  </TabBarContainer>
}

export default TabBar