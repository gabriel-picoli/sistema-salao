import { useState } from 'react'
import styled from 'styled-components'
import CalendarModal from '../modals/CalendarModal'

const DateInputContainer = styled.div`
  position: relative;
`

const CustomDateInput = styled.input`
  /* Estilos para o campo de entrada de data */
  width: 150px;
  padding: 8px;
  border: 1px solid #ccc;
  border-radius: 4px;
`

export default function DatePicker() {
  const [isCalendarOpen, setIsCalendarOpen] = useState(false)
  const [selectedDate, setSelectedDate] = useState(null)

  const handleInputChange = () => {
    setIsCalendarOpen(isCalendarOpen)
    console.log('Input clicked')
  }

  const handleDateSelect = (date) => {
    setSelectedDate(date)
    setIsCalendarOpen(false)
  }

  return (
    <DateInputContainer>
      <CustomDateInput
        type="text"
        value={selectedDate ? selectedDate.toLocaleDateString() : ''}
        readOnly
        onClick={handleInputChange}
      />
      <CalendarModal
        isOpen={isCalendarOpen}
        onClose={() => setIsCalendarOpen(false)}
        onSelect={handleDateSelect}
      />
    </DateInputContainer>
  )
}
