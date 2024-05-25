/* eslint-disable react-hooks/exhaustive-deps */
import { useRef, useEffect, useState } from 'react'

import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Calendar from '@event-calendar/core'
import TimeGrid from '@event-calendar/time-grid'
import Interaction from '@event-calendar/interaction'
import List from '@event-calendar/list'
import Resource from '@event-calendar/resource-time-grid'
import '@event-calendar/core/index.css'

import EventModal from '../modals/EventModal'

const StyledWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin: 20px;
`

const StyledCalendarWrapper = styled.div`
  flex: 1;
  overflow: hidden;
  border-radius: 11px;
  .ec-content {
    background-color: transparent;
    border: 1px solid ${(props) => props.theme.colors.primary};
  }
  .ec-resource {
    border-left: 1.5px solid ${(props) => props.theme.colors.primary};
  }
  .ec-day {
    background-color: transparent;
    border: none;
  }
  .ec-time {
    border: none;
  }
  .ec-line {
    display: none;
  }
  .ec-header {
    display: none;
    border: none;
  }
  .ec-event {
    background-color: ${(props) => props.theme.colors.primary};
  }
`

export default function CalendarSchedule({ currentDate }) {
  const [events, setEvents] = useState([]) // armazena os eventos da agenda
  const [openModal, setOpenModal] = useState(false) // controla se o modal está aberto ou fechado
  const [clickedDate, setClickedDate] = useState(null) // armazena a data clicada
  const [clickedResourceId, setClickedResourceId] = useState(null)
  const [selectedEvent, setSelectedEvent] = useState(null) // armazena o evento selecionado
  const ecRef = useRef(null) // dá referência para a agenda quando inicializada

  // função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setClickedDate(null) // limpa a data clicada ao fechar o modal
    setSelectedEvent(null) // limpa o evento selecionado ao fechar o modal
  }

  // inicializa a agenda quando a página é carregada
  useEffect(() => {
    initializeCalendar()
  }, [])

  // mantém a agenda atualizada
  useEffect(() => {
    if (ecRef.current) {
      ecRef.current.setOption('events', events)
      ecRef.current.setOption('date', currentDate)
    }
  }, [events, currentDate])

  const initializeCalendar = () => {
    // instanciando a agenda/calendário
    ecRef.current = new Calendar({
      target: document.getElementById('ec'), // renderiza no elemento que tem como id o "ec"
      props: {
        plugins: [TimeGrid, Interaction, List, Resource], // plugins utilizados
        // opções de configuração da agenda
        options: {
          view: 'resourceTimeGridDay',
          allDaySlot: false,
          slotMinTime: '06:00:00',
          slotMaxTime: '21:30:00',
          headerToolbar: {
            start: '',
            center: '',
            end: ''
          },
          pointer: true,
          events, // lista de eventos que serão exibidos e atualizados na agenda
          // lista para criar 10 colunas, inicialmente fictício
          resources: Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1), title: 'gab' })),
          dateClick: (info) => {
            const clickedResourceId = info.resource.id
            const clickedDate = new Date(info.dateStr)

            // Define o ID do recurso clicado no estado
            setClickedResourceId(clickedResourceId)
            setClickedDate(clickedDate)

            // Abre o modal
            setOpenModal(true)
          },
          eventClick: (info) => {
            const clickedEvent = info.event
            // define o evento clicado no estado
            setSelectedEvent({
              id: clickedEvent.id,
              title: clickedEvent.title,
              start: new Date(clickedEvent.start),
              end: new Date(clickedEvent.end),
              resourceId: clickedEvent.extendedProps.resourceId,
              user_id: clickedEvent.extendedProps.user_id,
              client: clickedEvent.extendedProps.client,
              services: clickedEvent.extendedProps.services
            })

            setOpenModal(true)
          }
        }
      }
    })
  }

  const addEvent = (eventData) => {
    console.log('evento adicionado:', eventData)

    const { start, duration, ...rest } = eventData
    const end = new Date(start.getTime() + duration)
    const newEvent = {
      id: uuidv4(),
      start,
      end,
      ...rest
    }

    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  return (
    <StyledWrapper>
      <StyledCalendarWrapper id="ec" className="allAgenda" />
      {/* verifica se openModal é verdadeiro, quando verdadeiro renderiza o modal */}
      {openModal && (
        <EventModal
          isOpen={openModal}
          onClose={handleCloseModal}
          initialDate={clickedDate}
          addEvent={addEvent}
          selectedEvent={selectedEvent}
          clickedResourceId={clickedResourceId}
        />
      )}
    </StyledWrapper>
  )
}
