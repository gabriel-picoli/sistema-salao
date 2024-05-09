import { useState, useRef, useEffect } from 'react'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

import styled from 'styled-components'

const ModalContainer = styled.div`
  z-index: 999;
  position: absolute;
  margin-top: 330px;
  left: ${(props) => props.left || '34.5%'};
  bottom: ${(props) => props.bottom || '40%'};
  background-color: #fff;
  padding: 40px;
  border-radius: 10px;
  box-shadow: 0px 0px 10px rgba(0, 0, 0, 0.3);
  height: 390px;
  width: 320px;
`

const CalendarWrapper = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const Header = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: 100%;
  margin-bottom: 15px;
`

const ArrowButton = styled.button`
  background-color: transparent;
  border: none;
  font-size: 20px;
  cursor: pointer;
`

const MonthYear = styled.span`
  font-size: 18px;
  display: flex;
  margin-bottom: 5px;
`

const DaysGrid = styled.div`
  display: grid;
  grid-template-columns: repeat(7, 1fr);
  gap: 8px;
`

const Day = styled.div`
  text-align: center;
  padding: 5px;
  cursor: pointer;
  border-radius: 50%;
  ${({ isSelected }) => isSelected && 'background-color: #64BAB8; color: aliceblue;'}
  ${({ isToday }) => isToday && 'border: 1px solid #64BAB8;'}
`

export default function CalendarModal({ isOpen, onClose, left, bottom }) {
  const modalRef = useRef(null)
  const [selectedDate, setSelectedDate] = useState(null)
  const [displayedDate, setDisplayedDate] = useState(new Date())

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (modalRef.current && !modalRef.current.contains(event.target)) {
        onClose()
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside)
    } else {
      document.removeEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isOpen, onClose])

  const daysInMonth = (date) => new Date(date.getFullYear(), date.getMonth() + 1, 0).getDate()
  const startOfMonth = (date) => new Date(date.getFullYear(), date.getMonth(), 1).getDay()

  const handlePrevMonth = () => {
    setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() - 1, 1))
  }

  const handleNextMonth = () => {
    setDisplayedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth() + 1, 1))
  }

  const handleDateClick = (day) => {
    setSelectedDate(new Date(displayedDate.getFullYear(), displayedDate.getMonth(), day))
  }

  const renderCalendar = () => {
    const days = []
    const numDaysInMonth = daysInMonth(displayedDate)
    const startingDay = startOfMonth(displayedDate)

    for (let i = 0; i < startingDay; i++) {
      days.push(null)
    }

    for (let i = 1; i <= numDaysInMonth; i++) {
      days.push(i)
    }

    return (
      <CalendarWrapper>
        <Header>
          <ArrowButton onClick={handlePrevMonth}>
            <IoIosArrowBack />
          </ArrowButton>
          <MonthYear>
            {displayedDate.toLocaleDateString(undefined, { month: 'long', year: 'numeric' })}
          </MonthYear>
          <ArrowButton onClick={handleNextMonth}>
            <IoIosArrowForward />
          </ArrowButton>
        </Header>
        <DaysGrid>
          {['Dom', 'Seg', 'Ter', 'Qua', 'Qui', 'Sex', 'Sab'].map((day) => (
            <div key={day}>{day}</div>
          ))}
          {days.map((day, index) => {
            const currentDate = new Date()
            const isToday =
              currentDate.getDate() === day && displayedDate.getMonth() === currentDate.getMonth()

            return (
              <Day
                key={index}
                onClick={() => handleDateClick(day)}
                isSelected={selectedDate && day === selectedDate.getDate()}
                isToday={isToday}
              >
                {day}
              </Day>
            )
          })}
        </DaysGrid>
      </CalendarWrapper>
    )
  }

  return (
    <>
      {isOpen && (
        <ModalContainer ref={modalRef} left={left} bottom={bottom}>
          {renderCalendar()}
        </ModalContainer>
      )}
    </>
  )
}
