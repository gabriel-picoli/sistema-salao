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
  const [clickedDate, setClickedDate] = useState(null) // armazena a data clicada
  const [clickedResourceId, setClickedResourceId] = useState(null)
  const ecRef = useRef(null) // da referencia para a agenda quando inicializada

  // funçao para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false)
    setClickedDate(null) // limpa a data clicada ao fechar o modal
  }

  // inicializa a agenda quando a pagina eh carregada
  useEffect(() => {
    initializeCalendar()
  }, [])

  // mantem a agenda atualizada
  useEffect(() => {
    if (ecRef.current) {
      ecRef.current.setOption('events', events)
      ecRef.current.setOption('date', currentDate)
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

            // Define o ID do recurso clicado no estado
            setClickedResourceId(clickedResourceId)
            setClickedDate(clickedDate)

            // Abre o modal
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
      {/* verifica se openModal eh verdadeiro, quando verdadeiro renderiza o modal */}
      {openModal && (
        <EventModal
          isOpen={openModal}
          onClose={handleCloseModal}
          initialDate={clickedDate}
          addEvent={addEvent}
          clickedResourceId={clickedResourceId} // Certifique-se de passar clickedResourceId aqui
        />
      )}
    </StyledWrapper>
  )
}
