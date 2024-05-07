/* eslint-disable no-unused-vars */
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

export default function DateNavigator({ currentDate, setCurrentDate }) {
  // se o currentDate nao estiver definindo, define como uma nova data
  if (!currentDate) {
    currentDate = new Date()
    setCurrentDate(currentDate) // atualiza o estado com a nova data
  }

  // função para avançar um dia
  const nextDay = () => {
    const nextDate = new Date(currentDate)
    nextDate.setDate(currentDate.getDate() + 1)
    setCurrentDate(nextDate) // Atualiza a data atual
  }

  // função para voltar um dia
  const prevDay = () => {
    const prevDate = new Date(currentDate)
    prevDate.setDate(currentDate.getDate() - 1)
    setCurrentDate(prevDate) // Atualiza a data atual
  }

  // data formatada para - "dia" de "mes"
  // certifica se currentDate não esta undefined antes de usar seus metodos
  const formattedDate = currentDate
    ? `${currentDate.getDate()} de ${currentDate.toLocaleDateString('pt-br', { month: 'long' })}`
    : ''

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
