import styled from 'styled-components'

import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'

import H3 from '../tipography/H3'

const ModalBackground = styled.div`
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  right: 0;
  background-color: #11111136;
  z-index: 1000;
`

const ModalContainer = styled.div`
  position: fixed;
  top: 50%;
  left: 50%;
  transform: translate(-50%, -50%);
  background-color: ${(props) => props.theme.colors.white};
  width: ${(props) => props.width || '1090px'};
  min-height: ${(props) => props.minHeight || '300px'};
  overflow: auto;
  border-radius: 5px;
  padding: 20px 30px;
`
const HeaderContainer = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
`

const CloseButton = styled.button`
  background-color: transparent;
  border: none;
  outline: none;
  cursor: pointer;
  font-size: 20px;
  font-weight: bold;
  color: ${(props) => props.theme.colors.primary};
  display: flex;
  align-items: flex-end;

  :hover {
    color: ${(props) => props.theme.colors.hoverPrimary};
  }
`

export default function EventModal({ isOpen, onClose, children, width, minHeight, title }) {
  if (isOpen) {
    return (
      <ModalBackground>
        <ModalContainer width={width} minHeight={minHeight}>
          <HeaderContainer>
            <H3>{title}</H3>
            <CloseButton onClick={onClose}>
              <CloseOutlinedIcon style={{ width: 35, height: 35 }} />
            </CloseButton>
          </HeaderContainer>
          <div>{children}</div>
        </ModalContainer>
      </ModalBackground>
    )
  }

  return null
}
