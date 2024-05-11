import { useState } from 'react'
import styled from 'styled-components'

const StyledButton = styled.button`
  box-shadow: 2px 1px 2px rgba(0, 0, 0, 0.288);
  min-width: 100px;
  max-width: 130px;
  height: 35px;
  border-radius: 10px;
  border: none;
  cursor: pointer;
  margin-right: 20px;
  font-weight: bold;
  padding: 0 10px;
  transition: all 0.05s ease-in;

  color: ${(props) => {
    // cor do texto com base no status
    if (props.status === 'confirmed') {
      return '#0090FF'
    } else if (props.status === 'scheduled') {
      return '#F9B959'
    } else if (props.status === 'waiting-command') {
      return '#DB5AEE'
    } else if (props.status === 'concluded') {
      return '#1AD598'
    } else if (props.status === 'late') {
      return '#FF665F'
    } else if (props.status === 'in-progress') {
      return '#3A36DB'
    } else if (props.status === 'canceled') {
      return '#555'
    } else {
      return 'black' // cor de texto padrao
    }
  }};

  background-color: ${(props) => {
    // cor de fundo com base no status
    if (props.status === 'confirmed') {
      return '#CCE9FF'
    } else if (props.status === 'scheduled') {
      return '#FEF1DE'
    } else if (props.status === 'waiting-command') {
      return '#F8DEFC'
    } else if (props.status === 'concluded') {
      return '#D1F7EA'
    } else if (props.status === 'late') {
      return '#FFE0DF'
    } else if (props.status === 'in-progress') {
      return '#D8D7F8'
    } else if (props.status === 'canceled') {
      return '#eee'
    } else {
      return '#eee' // cor de fundo padrao
    }
  }};

  border: ${(props) => {
    // cor da borda com base no status
    if (props.isSelected) {
      if (props.status === 'confirmed') {
        return '3px solid #0090FF'
      } else if (props.status === 'scheduled') {
        return '3px solid #F9B959'
      } else if (props.status === 'waiting-command') {
        return '3px solid #DB5AEE'
      } else if (props.status === 'concluded') {
        return '3px solid #1AD598'
      } else if (props.status === 'late') {
        return '3px solid #FF665F'
      } else if (props.status === 'in-progress') {
        return '3px solid #3A36DB'
      } else if (props.status === 'canceled') {
        return '3px solid #555'
      } else {
        return '3px solid black' // cor da borda selecionada padrão
      }
    } else {
      return 'none' // sem borda quando não selecionado
    }
  }};
`

export default function ClientStatusButton({ children, status, onClick }) {
  const [isSelected, setIsSelected] = useState(false)

  const handleClick = () => {
    setIsSelected(!isSelected)
    onClick && onClick()
  }

  return (
    <StyledButton status={status} isSelected={isSelected} onClick={handleClick}>
      {children}
    </StyledButton>
  )
}
