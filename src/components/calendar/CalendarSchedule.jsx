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
  const [openModal, setOpenModal] = useState(false) // controla se o modal esta aberto ou fechado
  const ecRef = useRef(null) // da referencia para a agenda quando inicializada

  // funçao para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  // inicializa a agenda quando a pagina eh carregada
  useEffect(() => {
    initializeCalendar()
  }, [])

  // mantem a agenda atualizada
  useEffect(() => {
    if (ecRef.current) {
      // verifica se a agenda ja foi inicializada
      ecRef.current.setOption('events', events) // atualiza a lista de eventos
      ecRef.current.setOption('date', currentDate) // atualiza a data
    }
  }, [events, currentDate])

  const initializeCalendar = () => {
    // instanciando a agenda/calendario
    ecRef.current = new Calendar({
      target: document.getElementById('ec'), // renderiza no elemento q tem como id o "ec"
      props: {
        plugins: [TimeGrid, Interaction, List, Resource], // plugins utilizados
        // opçoes de configuraçao da agenda
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
          events, // lista de eventos que serao exibidos e atualizados na agenda
          // lista para criar 10 colunas, inicialmente ficticio
          resources: Array.from({ length: 10 }, (_, i) => ({ id: String(i + 1), title: 'gab' })),
          dateClick: (info) => {
            const clickedResourceId = info.resource.id
            const clickedDate = new Date(info.dateStr)
            addEvent({
              start: clickedDate,
              end: new Date(clickedDate.getTime() + 60 * 60 * 1000),
              title: 'Novo Evento',
              backgroundColor: `${(props) => props.theme.colors.primary}`,
              resourceId: clickedResourceId
            })
          }
        }
      }
    })
  }

  const addEvent = (eventData) => {
    const { start, duration, ...rest } = eventData // desestrutura os dados do evento recebido como parametro
    const end = new Date(start.getTime() + duration) // calcula o fim do evento com base na duraçao
    const newEvent = {
      id: uuidv4(), // gera um id unico para o evento
      start, // data de inicio
      end, // data de termino
      ...rest // quaisquer outras propriedades
    }
    setEvents((prevEvents) => [...prevEvents, newEvent]) // adiciona um novo evento ao estado de eventos
  }
  return (
    <StyledWrapper>
      <StyledCalendarWrapper id="ec" className="allAgenda" />
      {/* verifica se openModal eh verdadeiro, quando verdadeiro renderiza o modal */}
      {openModal && <EventModal isOpen={openModal} onClose={handleCloseModal} />}
    </StyledWrapper>
  )
}
