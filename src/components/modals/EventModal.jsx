/* eslint-disable no-unused-vars */
import { useState } from 'react'
import { useForm } from 'react-hook-form'

import styled from 'styled-components'

import { FaCalendarAlt } from 'react-icons/fa'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'

import Modal from './Modal'
import Input from '../inputs/Input'
import Button from '../inputs/Button'
import CalendarModal from './CalendarModal'
import Dropdown from '../inputs/Dropdown'
import ClientStatusButton from '../inputs/ClientStatusButton'

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
  margin-top: 5px;
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
  margin-top: 40px;
  margin-bottom: 20px;
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
const ClientStatusButtonContainer = styled.div`
  display: flex;
  align-items: center;
  margin-top: 30px;
  margin-bottom: 40px;
`
const FooterButtonsContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: flex-end;
  width: 100%;
`

export default function EventModal({ isOpen, onClose }) {
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [servicesVisible, setServicesVisible] = useState([true])
  const [selectedServices, setSelectedServices] = useState(Array(servicesVisible.length).fill(null))

  const services = ['mechas', 'unhas', 'spa', 'mega hair']
  const employees = ['pami', 'maria', 'juli', 'ange']

  const { handleSubmit, control, reset } = useForm()

  const onSubmit = (data) => {
    data.services.forEach((service, index) => {
      console.log(`serviço ${index + 1}:`, service)
    })
    // fechar o modal e resetar o formulário apos a submissao
    // onClose()
    // reset()
  }

  const handleCloseServicesContainer = (index) => {
    setServicesVisible((prev) => prev.map((item, i) => (i === index ? false : item)))
  }

  const handleAddServicesContainer = () => {
    setServicesVisible((prev) => [...prev, true])
  }

  if (isOpen) {
    return (
      <Modal isOpen={isOpen} onClose={onClose} title="Agendamento">
        <form onSubmit={handleSubmit(onSubmit)}>
          <ContentContainer>
            <FirstContentContainer>
              <Input name="client" control={control} placeholder="Cliente" width="650px" />
              <Button textWidth="100%" width="200px" height="42px">
                CADASTRAR NOVO
              </Button>
            </FirstContentContainer>
            <SecondContentContainer>
              <DatePickerContainer>
                <Input
                  name="date"
                  control={control}
                  width="130px"
                  placeholder="DD/MM/AAAA"
                  type="date"
                />
                {/* <ClickCalendar onClick={() => setOpenCalendarModal(true)}>
                  <FaCalendarAlt size={30} style={{ color: '#64BAB8' }} />
                </ClickCalendar>
                <CalendarModal
                  isOpen={openCalendarModal}
                  onClose={() => setOpenCalendarModal(false)}
                  left="15.5%"
                  bottom="20%"
                /> */}
              </DatePickerContainer>
              <Button textWidth="100%" width="130px" height="42px">
                WHATSAPP
              </Button>
            </SecondContentContainer>
            <InfoServicesContainer>
              <p style={{ marginRight: '185px' }}>Serviço</p>
              <p style={{ marginRight: '148px' }}>Profissional</p>
              <p style={{ marginRight: '75px' }}>Tempo</p>
              <p style={{ marginRight: '98px' }}>Início</p>
              <p style={{ marginRight: '110px' }}>Fim</p>
              <p>Valor</p>
            </InfoServicesContainer>
            <SeparatorLine />
            {servicesVisible.map((visible, index) => (
              <InfoServicesInputsContainer key={index} visible={visible}>
                <Dropdown
                  options={services}
                  text="Escolha um serviço"
                  marginRight="40px"
                  onChange={(selectedOption) => {
                    const updatedServices = [...selectedServices]
                    updatedServices[index] = selectedOption
                    setSelectedServices(updatedServices)
                  }}
                />
                <Dropdown
                  options={employees}
                  text="Escolha um funcionário"
                  marginRight="40px"
                  onChange={(selectedOption) => {
                    const updatedServices = [...selectedServices]
                    updatedServices[index] = selectedOption
                    setSelectedServices(updatedServices)
                  }}
                />
                <Input
                  name={`services[${index}].time`}
                  control={control}
                  width="90px"
                  placeholder="Em mins"
                  marginRight="40px"
                />
                <Input
                  name={`services[${index}].start`}
                  control={control}
                  width="100px"
                  placeholder="07:30"
                  marginRight="40px"
                />
                <Input
                  name={`services[${index}].end`}
                  control={control}
                  width="100px"
                  placeholder="08:30"
                  marginRight="40px"
                />
                <Input
                  name={`services[${index}].value`}
                  control={control}
                  width="150px"
                  placeholder="R$"
                  marginRight="40px"
                  isMoneyInput
                />

                <CloseButton onClick={() => handleCloseServicesContainer(index)}>
                  <CloseOutlinedIcon style={{ width: 23, height: 23 }} />
                </CloseButton>
              </InfoServicesInputsContainer>
            ))}
            <AddServiceContainer onClick={handleAddServicesContainer}>
              <AddRoundedIcon style={{ width: 30, height: 30 }} />
              <AddText>Adicionar Serviço</AddText>
            </AddServiceContainer>
            <p>Total a pagar</p>
            <Input name="total" control={control} isMoneyInput placeholder="R$" />
            <ClientStatusButtonContainer>
              <ClientStatusButton status="confirmed">Confirmado</ClientStatusButton>
              <ClientStatusButton status="scheduled">Agendado</ClientStatusButton>
              <ClientStatusButton status="waiting-command">Esp. Comanda</ClientStatusButton>
              <ClientStatusButton status="concluded">Concluído</ClientStatusButton>
              <ClientStatusButton status="late">Atrasado</ClientStatusButton>
              <ClientStatusButton status="in-progress">Em andamento</ClientStatusButton>
              <ClientStatusButton status="canceled">Cancelado</ClientStatusButton>
            </ClientStatusButtonContainer>
          </ContentContainer>
          <FooterButtonsContainer>
            <Button
              width="120px"
              backgroundColor="#eee"
              textColor="black"
              hoverBackgroundColor="#c0c0c07f"
              onClick={onClose}
            >
              Cancelar
            </Button>
            <Button width="120px" marginLeft="15px" type="submit">
              Confirmar
            </Button>
          </FooterButtonsContainer>
        </form>
      </Modal>
    )
  }

  return null
}
