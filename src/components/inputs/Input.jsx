import { useState } from 'react'

import styled from 'styled-components'

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  background-color: transparent;
  border: 2px solid #c1e3e3;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;
  color: ${(props) => props.theme.colors.black};
  margin-right: ${(props) => props.marginRight || '0px'};

  outline: none;

  &::placeholder {
    color: #999;
  }
`

const MoneyInputWrapper = styled.div`
  position: relative;
`

const MoneyInput = ({ placeholder, width, marginRight, isMoneyInput }) => {
  const [value, setValue] = useState('')

  const handleInputChange = (event) => {
    let inputValue = event.target.value

    // remove tudo exceto nemeros e o ponto decimal
    inputValue = inputValue.replace(/[^0-9.]/g, '')

    // formata o valor de acordo com o padrao de moeda desejado, se for um input de dinheiro
    if (isMoneyInput) {
      // converte a string em numero (remove pontos e virgulas) e formata com duas casas decimais
      const floatValue = parseFloat(inputValue.replace(/[.,]/g, '')) || 0
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(floatValue / 100) // divide por 100 para converter centavos em reais
      setValue(formattedValue)
    } else {
      setValue(inputValue)
    }
  }

  return (
    <MoneyInputWrapper>
      <StyledInput
        type="text"
        placeholder={placeholder}
        width={width}
        value={value}
        marginRight={marginRight}
        onChange={handleInputChange}
      />
    </MoneyInputWrapper>
  )
}

export default MoneyInput
