import { useState } from 'react'

import styled from 'styled-components'

import { FaCalendarAlt } from 'react-icons/fa'

import EventModal from '../src/components/modals/EventModal'
import Input from '../src/components/inputs/Input'
import Button from '../src/components/inputs/Button'
import CalendarModal from '../src/components/modals/CalendarModal'

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
  margin-bottom: 30px;
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
  border: 0.5px solid #646464;
`

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false)
  const [openCalendarModal, setOpenCalendarModal] = useState(false)
  const [hovered, setHovered] = useState(false)

  return (
    <div>
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
                onClick={() => setOpenCalendarModal(true)} // Alterando para abrir/fechar o modal
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
                left="18.5%"
                bottom="-40%"
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
          <SeparatorLine />
        </ContentContainer>
      </EventModal>
    </div>
  )
}
