import { useState } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt } from 'react-icons/fa'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

import EventModal from '../src/components/modals/EventModal'
import Input from '../src/components/inputs/Input'
import Button from '../src/components/inputs/Button'
import CalendarModal from '../src/components/modals/CalendarModal'
import Dropdown from '../src/components/inputs/Dropdown'

const ContentContainer = styled.div`
  display: flex;
  flex-direction: column;
  margin-top: 25px;
`
const FirstContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const SecondContentContainer = styled.div`
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
`

const DatePickerContainer = styled.div`
  display: flex;
  align-items: center;
  gap: 5px;
`

const ClickCalendar = styled.div`
  cursor: pointer;
`

const SeparatorLine = styled.div`
  height: 0.5;
  border: 0.5px solid #4e4e4e;
  margin-bottom: 20px;
`

const InfoServicesContainer = styled.div`
  width: 100%;
  display: flex;
  color: ${(props) => props.theme.colors.black};
`

const InfoServicesInputsContainer = styled.div`
  width: 100%;
  display: ${(props) => (props.visible ? 'flex' : 'none')};
  align-items: center;
  margin-bottom: 10px;
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

const AddServiceContainer = styled.div`
  width: 100%;
  padding: 5px 0;
  display: flex;
  align-items: center;
  justify-content: center;
  background-color: transparent;
  color: ${(props) => props.theme.colors.primary};
  cursor: pointer;
  border: none;
  outline: none;
  margin-right: 20px;
  margin-top: 20px;
  border-radius: 10px;
  transition: all 0.25s ease-in-out;

  :hover {
    color: ${(props) => props.theme.colors.hoverPrimary};
    background-color: #c9c9c96a;
  }
`

const AddText = styled.p`
  color: ${(props) => props.theme.colors.black};
`

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [servicesVisible, setServicesVisible] = useState([true]) // Inicializa com um item visível
  const [hovered, setHovered] = useState(false)

  const services = ['mechas', 'unhas', 'spa', 'mega hair']
  const employees = ['pami', 'maria', 'juli', 'ange']

  const handleCloseServicesContainer = (index) => {
    setServicesVisible((prev) => prev.filter((_, i) => i !== index))
  }

  const handleAddServicesContainer = () => {
    setServicesVisible((prev) => [...prev, true])
  }

  return (
    <>
      <button onClick={() => setOpenModal(true)}>abrir o modal</button>
      <EventModal isOpen={openModal} onClose={() => setOpenModal(false)} title="Agendamento">
        <ContentContainer>
          <FirstContentContainer>
            <Input placeholder="Cliente" width="650px" />
            <Button textWidth="100%" width="200px" height="42px">
              CADASTRAR NOVO
            </Button>
          </FirstContentContainer>
          <SecondContentContainer>
            <DatePickerContainer>
              <Input width="115px" placeholder="DD/MM/AAAA" />
              <ClickCalendar
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
                onClick={() => setOpenCalendarModal(true)}
              >
                <FaCalendarAlt
                  size={30}
                  style={{
                    color: hovered ? '#4d9291c5' : '#64BAB8',
                    transition: 'color 0.2s ease-in-out'
                  }}
                />
              </ClickCalendar>
              <CalendarModal
                isOpen={openCalendarModal}
                onClose={() => setOpenCalendarModal(false)}
                left="50%"
                bottom="50%" // Ajuste a posição do modal do calendário
              />
            </DatePickerContainer>
            <Button
              textWidth="100%"
              width="130px"
              height="42px"
              onClick={() => setOpenCalendarModal(true)}
            >
              WHATSAPP
            </Button>
          </SecondContentContainer>
          <InfoServicesContainer>
            <p style={{ marginRight: '170px' }}>Serviço</p>
            <p style={{ marginRight: '135px' }}>Profissional</p>
            <p style={{ marginRight: '60px' }}>Tempo</p>
            <p style={{ marginRight: '85px' }}>Início</p>
            <p style={{ marginRight: '97px' }}>Fim</p>
            <p>Valor</p>
          </InfoServicesContainer>
          <SeparatorLine />
          {servicesVisible.map((visible, index) => (
            <InfoServicesInputsContainer key={index} visible={visible}>
              <Dropdown options={services} text="Escolha um serviço" marginRight="26px" />
              <Dropdown options={employees} text="Escolha um profissional" marginRight="26px" />
              <Input width="90px" placeholder="Em mins" marginRight="26px" />
              <Input width="100px" placeholder="07:30" marginRight="26px" />
              <Input width="100px" placeholder="08:30" marginRight="26px" />
              <Input width="150px" placeholder="R$ 180,00" marginRight="20px" />
              <CloseButton onClick={() => handleCloseServicesContainer(index)}>
                <CloseOutlinedIcon style={{ width: 23, height: 23 }} />
              </CloseButton>
            </InfoServicesInputsContainer>
          ))}
          <AddServiceContainer onClick={handleAddServicesContainer}>
            <AddRoundedIcon style={{ width: 30, height: 30 }} />
            <AddText>Adicionar Serviço</AddText>
          </AddServiceContainer>
        </ContentContainer>
      </EventModal>
    </>
  )
}
