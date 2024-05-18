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

export default function Input({ placeholder, width, marginRight, isMoneyInput, type, readOnly }) {
  const [value, setValue] = useState('')

  const handleInputChange = (event) => {
    let inputValue = event.target.value

    // verifica se o input eh para dinheiro e remove tudo exceto numeros e o ponto decimal
    if (isMoneyInput) inputValue = inputValue.replace(/[^0-9.]/g, '')

    // atualiza o estado com o valor original
    setValue(inputValue)
  }

  const handleInputBlur = () => {
    if (isMoneyInput) {
      // formata o valor ao sair do input
      const floatValue = parseFloat(value.replace(/[.,]/g, '')) || 0
      const formattedValue = new Intl.NumberFormat('pt-BR', {
        style: 'currency',
        currency: 'BRL'
      }).format(floatValue / 100) // divide por 100 para converter centavos em reais

      // atualiza o estado com o valor formatado
      setValue(formattedValue)
    }
  }

  return (
    <MoneyInputWrapper>
      <StyledInput
        type={type}
        placeholder={placeholder}
        width={width}
        readOnly={readOnly}
        marginRight={marginRight}
        onChange={handleInputChange}
        onBlur={handleInputBlur}
        value={value}
      />
    </MoneyInputWrapper>
  )
}
