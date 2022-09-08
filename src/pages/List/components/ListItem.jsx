import {
  ListItemContainer,
  ItemName,
  ItemNote,
  TextContainer,
  CheckBox,
  MoreDetailsContainer,
  ImageIcon,
  SubLineWrapper,
} from './listItemStyle.js'

import { useListsStore } from '/src/stores';
import { ItemDetailsPopup } from '/src/components'

import { MoreVertical } from 'lucide-react';
import { useState } from 'react'

const ListItem = ({ item }) => {
  // const toggleItem = useListStore(s => s.toggleItem)
  const [itemDetailsOpen, setItemDetailsOpen] = useState(false)
  const upsertList = useListsStore(s => s.upsertList)
  const getCurrList = useListsStore(s => s.getCurrList)
  const { authorID, dateAdded, imageURL, isChecked, itemUID, name, note } = item

  return <>
    <ListItemContainer onClick={() => {
      const currList = getCurrList()
      upsertList({
        ...currList,
        items: currList.items.map((item) => 
          item.itemUID === itemUID ? { ...item, isChecked: !item.isChecked} : item
        )
      })
    }}>
      <CheckBox checked={isChecked} />
      <TextContainer>
        <ItemName checked={isChecked}>{name}</ItemName>
        <SubLineWrapper>
          {imageURL && <ImageIcon size={15} />}
          <ItemNote checked={isChecked}>{note}</ItemNote>
        </SubLineWrapper>
      </TextContainer>
      <MoreDetailsContainer title='More details' onClick={e => {
          e.stopPropagation()
          setItemDetailsOpen(true)
        }}
      >
        <MoreVertical />
      </MoreDetailsContainer>
    </ListItemContainer>
    {itemDetailsOpen && <ItemDetailsPopup
      item={item}
      closeFn={() => setItemDetailsOpen(false)} />
    }
  </>
}

export default ListItem