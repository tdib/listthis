import { styled } from 'goober'
import { Plus } from 'lucide-react'

export const TabBarContainer = styled('div')`
  position: fixed;
  bottom: 0;
  width: 100%;
  height: var(--tabbar-size);
  background: var(--surface);
  box-shadow: 0 0 50px var(--shadow);
`

export const AddButtonCircle = styled('button')`
  width: 4.25em;
  height: 4.25em;
  border-radius: 50%;
  position: absolute;
  left: 50%;
  transform: translate(-50%);
  bottom: 1.5em;
  display: flex;
  justify-content: center;
  align-items: center;
  background: var(--brand);
  box-shadow: 0 0 5px var(--shadow);

  border: none;

  &:hover {
    cursor: pointer;
  }
`

export const AddButtonPlus = styled(Plus)`
  position: absolute;
  color: var(--white);
  width: 2.3em;
  height: 2.3em;
`