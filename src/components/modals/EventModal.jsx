import { Modal } from '@mui/material'
import styled from 'styled-components'

import Input from '../inputs/Input'
import H3 from '../tipography/H3'
import Button from '../inputs/Button'
import DatePicker from '../calendar/DatePicker'

const StyledModal = styled(Modal)`
  display: flex;
  justify-content: center;
  align-items: center;
`

const ModalContent = styled.div`
  background-color: aliceblue;
  border-radius: 8px;
  padding: 20px;
  width: 800px;
  display: flex;
  flex-direction: column;
  outline: none;
  border: none;
`

const HeaderContainer = styled.div`
  display: flex;
`

const ClientContent = styled.div`
  margin-top: 20px;
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const DateContainer = styled.div`
  display: flex;
  justify-content: space-between;
`

const CustomModal = ({ open, onClose }) => {
  return (
    <StyledModal
      open={open}
      onClose={onClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <ModalContent>
        <HeaderContainer>
          <H3>Agendamento</H3>
        </HeaderContainer>
        <ClientContent>
          <Input placeholder="Cliente" width="550px" />
          <Button width="180px" height="43px" textWidth="100%">
            CADASTRAR NOVO
          </Button>
        </ClientContent>
        <DateContainer>
          <DatePicker />
          <Button width="130px" height="43px">
            WHATSAPP
          </Button>
        </DateContainer>
      </ModalContent>
    </StyledModal>
  )
}

export default CustomModal
