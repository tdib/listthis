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
  const { toggleItem } = useListStore()
  console.log(item);
  const { authorID, dateAdded, imageURL, isChecked, itemID, name, note } = item

  return <AllItemsContainer>
      <ListItemContainer onClick={() => toggleItem(itemID)}>
        <CheckBox checked={isChecked} />
        <TextContainer>
          <ItemName>{name}</ItemName>
          <SubLineWrapper>
            {imageURL && <ImageIcon size={15} />}
            <ItemNote>{note}</ItemNote>
          </SubLineWrapper>
        </TextContainer>
        <MoreButton
          onClick={e => {
            e.stopPropagation()
          }}
        />
      </ListItemContainer>
      {/* <ItemDetailsPopup item={item} isOpen={itemDetailsOpen} onClose={() => setItemDetailsOpen(false)} /> */}
    </AllItemsContainer>

}

export default ListItem