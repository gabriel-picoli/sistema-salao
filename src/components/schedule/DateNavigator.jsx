/* eslint-disable no-unused-vars */
import { useState } from 'react'

import styled from 'styled-components'

import { IoIosArrowBack, IoIosArrowForward } from 'react-icons/io'

const StyledArrowContainer = styled.div`
  margin: 0 20px;
  display: flex;
  justify-content: center;
  align-items: center;
`

const StyledArrowButton = styled.button`
  background-color: transparent;
  border: none;
  cursor: pointer;
`

const StyledArrowSpan = styled.span`
  font-size: 21px;
  margin: 0 8px;
`

export default function DateNavigator() {
  // inicializa data atual
  const currentDate = new Date()
  const [date, setDate] = useState(currentDate)

  // funçao para avançar um dia
  const nextDay = () => {
    const nextDate = new Date(date)
    nextDate.setDate(date.getDate() + 1)
    setDate(nextDate)
  }

  // funçao para voltar um dia
  const prevDay = () => {
    const prevDate = new Date(date)
    prevDate.setDate(date.getDate() - 1)
    setDate(prevDate)
  }

  // data formatada para - "dia" de "mes"
  const formattedDate = `${date.getDate()} de ${date.toLocaleDateString('pt-br', {
    month: 'long'
  })}`

  return (
    <StyledArrowContainer>
      <StyledArrowButton onClick={prevDay}>
        <IoIosArrowBack size={22} />
      </StyledArrowButton>
      <StyledArrowSpan>{formattedDate}</StyledArrowSpan>
      <StyledArrowButton onClick={nextDay}>
        <IoIosArrowForward size={22} />
      </StyledArrowButton>
    </StyledArrowContainer>
  )
}
