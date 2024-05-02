import { useRef, useEffect } from 'react'

import Calendar from '@event-calendar/core'
import TimeGrid from '@event-calendar/time-grid'
import Interaction from '@event-calendar/interaction'
import List from '@event-calendar/list'
import Resource from '@event-calendar/resource-time-grid'
import '@event-calendar/core/index.css'

import styled from 'styled-components'

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

export default function CalendarSchedule() {
  // armazena a data e hora atuais no calendario
  const selectedDate = useRef(new Date())

  useEffect(() => {
    const ec = new Calendar({
      target: document.getElementById('ec'),
      props: {
        plugins: [TimeGrid, Interaction, List, Resource],
        options: {
          date: selectedDate.current,
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
          events: [],
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
          ]
        }
      }
    })

    return () => {
      ec.destroy()
    }
  }, [])

  return (
    <StyledWrapper>
      <StyledCalendarWrapper id="ec" className="allAgenda" />
    </StyledWrapper>
  )
}
