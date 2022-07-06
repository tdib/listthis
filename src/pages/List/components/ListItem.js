import { useListStore } from '/src/stores';
import {
  AllItemsContainer,
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
  CheckBox,
  MoreButton,
  ImageIcon,
  SubLineWrapper,
} from './listItemStyle.js'

const ListItem = ({ item }) => {
  const toggleItem = useListStore(s => s.toggleItem)
  const { authorID, dateAdded, imageURL, isChecked, itemUID, name, note } = item

  return <ListItemContainer onClick={() => toggleItem(itemUID)}>
      <CheckBox checked={isChecked} />
      <TextContainer>
        <ItemName checked={isChecked}>{name}</ItemName>
        <SubLineWrapper>
          {imageURL && <ImageIcon size={15} />}
          <ItemNote checked={isChecked}>{note}</ItemNote>
        </SubLineWrapper>
      </TextContainer>
      <MoreButton
        onClick={e => {
          e.stopPropagation()
        }}
      />
    </ListItemContainer>
    {/* <ItemDetailsPopup item={item} isOpen={itemDetailsOpen} onClose={() => setItemDetailsOpen(false)} /> */}

}

export default ListItem