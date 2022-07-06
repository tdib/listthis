import { TabBarContainer, AddButtonCircle, AddButtonPlus } from './tabBarStyle'

const TabBar = ({ title, clickFn }) => {
  return <TabBarContainer>
    <AddButtonCircle title={title} onClick={clickFn}>
      <AddButtonPlus />
    </AddButtonCircle>
  </TabBarContainer>
}

export default TabBar