import { Controller } from 'react-hook-form'

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

export default function Input({
  name,
  control,
  placeholder,
  width,
  marginRight,
  isMoneyInput,
  type,
  readOnly
}) {
  const formatMoney = (value) => {
    const floatValue = parseFloat(value.replace(/[^\d]/g, '')) || 0
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL'
    }).format(floatValue / 100)
  }

  const handleInputChange = (event, onChange) => {
    let inputValue = event.target.value
    if (isMoneyInput) {
      inputValue = inputValue.replace(/[^0-9]/g, '')
    }
    onChange(inputValue)
  }

  const handleInputBlur = (event, onBlur) => {
    if (isMoneyInput) {
      const formattedValue = formatMoney(event.target.value)
      onBlur(formattedValue)
    } else {
      onBlur(event)
    }
  }

  return (
    <Controller
      name={name}
      control={control}
      defaultValue=""
      render={({ field }) => (
        <StyledInput
          {...field}
          type={type}
          placeholder={placeholder}
          width={width}
          readOnly={readOnly}
          marginRight={marginRight}
          onChange={(e) => handleInputChange(e, field.onChange)}
          onBlur={(e) => handleInputBlur(e, field.onBlur)}
          value={isMoneyInput ? formatMoney(field.value) : field.value}
        />
      )}
    />
  )
}
