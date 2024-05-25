/* eslint-disable no-unused-vars */
import { useState, useEffect } from 'react'
import { useForm } from 'react-hook-form'
import styled from 'styled-components'
import CloseOutlinedIcon from '@mui/icons-material/CloseOutlined'
import AddRoundedIcon from '@mui/icons-material/AddRounded'
import Modal from './Modal'
import Input from '../inputs/Input'
import Button from '../inputs/Button'
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

export default function EventModal({
  isOpen,
  onClose,
  initialDate,
  addEvent,
  selectedEvent,
  clickedResourceId
}) {
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [servicesVisible, setServicesVisible] = useState([true])
  const { handleSubmit, control, reset } = useForm()

  const services = ['a', 'b', 'c', 'd', 'e']
  const employees = ['1', '2', '3', '4', '5']

  useEffect(() => {
    if (initialDate) {
      const startTime = initialDate.toTimeString().substring(0, 5)
      const endTime = new Date(initialDate.getTime() + 60 * 60 * 1000)
        .toTimeString()
        .substring(0, 5)
      reset({
        'services[0].start': startTime,
        'services[0].end': endTime
      })
    }
  }, [initialDate, reset])

  useEffect(() => {
    if (selectedEvent) {
      const { title, start, end, services, client } = selectedEvent

      reset({
        client,
        date: start.toISOString().substr(0, 10),
        services: services
          ? services.map((service) => ({
              ...service,
              start: new Date(service.start).toTimeString().substring(0, 5),
              end: new Date(service.end).toTimeString().substring(0, 5)
            }))
          : []
      })

      setServicesVisible(services ? Array(services.length).fill(true) : [])
    }
  }, [selectedEvent, reset])

  const onSubmit = (data) => {
    if (data.services && data.services.length > 0) {
      const startDate = new Date(initialDate)
      const [startHours, startMinutes] = data.services[0].start.split(':').map(Number)
      const [endHours, endMinutes] = data.services[0].end.split(':').map(Number)

      startDate.setHours(startHours, startMinutes)

      const endDate = new Date(startDate)
      endDate.setHours(endHours, endMinutes)

      const formData = {
        client: data.client,
        date: data.date,
        services: data.services.map((service) => ({
          ...service,
          start: new Date(startDate),
          end: new Date(endDate)
        }))
      }

      console.log('Form Data:', formData)
      console.log('Clicked Resource ID:', clickedResourceId)

      addEvent({
        start: startDate,
        end: endDate,
        title: `${data.client} - ${data.services[0].name}`,
        user_id: clickedResourceId,
        resourceId: clickedResourceId
      })

      onClose()
    }
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
                  control={control}
                  text="serviço"
                  name={`services[${index}].name`}
                  marginRight="40px"
                />
                <Dropdown
                  options={employees}
                  control={control}
                  text="funcionário"
                  name={`services[${index}].employee`}
                  marginRight="40px"
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

                <CloseButton type="button" onClick={() => handleCloseServicesContainer(index)}>
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
