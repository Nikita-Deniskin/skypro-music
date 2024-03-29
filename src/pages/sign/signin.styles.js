import { styled } from 'styled-components'

export const wrapper = styled.div`
  width: 100%;
  min-height: 100%;
  overflow: hidden;
`
export const containerEnter = styled.div`
  max-width: 100%;
  height: 100vh;
  margin: 0 auto;
  position: relative;
  background-color: rgba(0, 0, 0, 0.85);
`

export const modalBlock = styled.div`
  position: absolute;
  z-index: 2;
  left: calc(50% - (366px / 2));
  top: calc(50% - (439px / 2));
  opacity: 1;
`