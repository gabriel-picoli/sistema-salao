import { useRef, useEffect, useState } from 'react'

import styled from 'styled-components'
import { v4 as uuidv4 } from 'uuid'

import Calendar from '@event-calendar/core'
import TimeGrid from '@event-calendar/time-grid'
import Interaction from '@event-calendar/interaction'
import List from '@event-calendar/list'
import Resource from '@event-calendar/resource-time-grid'
import '@event-calendar/core/index.css'

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

const CalendarSchedule = () => {
  const [events, setEvents] = useState([])
  const ecRef = useRef(null)

  useEffect(() => {
    initializeCalendar()
  }, []) // Executa apenas uma vez no carregamento inicial

  useEffect(() => {
    // Atualiza o calendário sempre que houver mudança nos eventos
    if (ecRef.current) {
      ecRef.current.setOption('events', events)
    }
  }, [events])

  const initializeCalendar = () => {
    ecRef.current = new Calendar({
      target: document.getElementById('ec'),
      props: {
        plugins: [TimeGrid, Interaction, List, Resource],
        options: {
          view: 'resourceTimeGridDay',
          allDaySlot: false,
          slotMinTime: '07:00:00',
          slotMaxTime: '23:00:00',
          headerToolbar: {
            start: '',
            center: '',
            end: ''
          },
          pointer: true,
          events,
          resources: [
            { id: '1', title: 'gab' },
            { id: '2', title: 'gab' },
            { id: '3', title: 'gab' },
            { id: '4', title: 'gab' },
            { id: '5', title: 'gab' },
            { id: '6', title: 'gab' },
            { id: '7', title: 'gab' },
            { id: '8', title: 'gab' },
            { id: '9', title: 'gab' },
            { id: '10', title: 'gab' }
          ],
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
    const newEvent = {
      id: uuidv4(),
      ...eventData
    }
    setEvents((prevEvents) => [...prevEvents, newEvent])
  }

  return (
    <StyledWrapper>
      <StyledCalendarWrapper id="ec" className="allAgenda" />
    </StyledWrapper>
  )
}

export default CalendarSchedule
