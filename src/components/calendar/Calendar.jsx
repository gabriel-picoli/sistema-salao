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
  border-radius: 10px;
  overflow: hidden;

  .ec-resource {
    border-bottom: none;
    border-radius: 0;
  }

  .ec-content {
    background-color: transparent;
    border: solid;
    border-radius: 10px;
  }

  .ec-day {
    background-color: transparent;
  }

  .ec-time {
    border: none;
  }

  .ec-line {
    display: none;
  }

  .ec-header {
    display: none;
  }

  .ec-cell {
    border-right: solid;
  }

  .ec-event {
    background-color: ${(props) => props.theme.colors.primary};
    border-radius: 10px;
  }
`

const App = () => {
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
          slotMinTime: '07:00:00',
          slotMaxTime: '23:00:00',
          headerToolbar: {
            start: '',
            center: '',
            end: ''
          },
          pointer: true,
          events: [],
          resources: [
            { id: '1', title: 'Leozin' },
            { id: '2', title: 'Valdo' },
            { id: '3', title: 'Valdo' },
            { id: '4', title: 'Valdo' },
            { id: '5', title: 'Valdo' },
            { id: '6', title: 'Valdo' },
            { id: '7', title: 'Valdo' },
            { id: '8', title: 'Valdo' },
            { id: '9', title: 'Valdo' },
            { id: '10', title: 'Valdo' }
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
      <StyledCalendarWrapper id="ec" className="allAgenda"></StyledCalendarWrapper>
    </StyledWrapper>
  )
}

export default App
