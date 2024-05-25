import { useState } from 'react'

import { Controller } from 'react-hook-form'
import styled from 'styled-components'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const StyledDropdown = styled.select`
  background-color: transparent;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #c1e3e3;
  color: ${(props) => (props.selected ? props.theme.colors.black : '#999')};
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.dropdownWidth || '200px'};
  height: 45px;
  margin-right: ${(props) => props.marginRight || '0px'};
  outline: none;
`

const Dropdown = ({ options, text, dropdownWidth, listWidth, marginRight, control }) => {
  const [selectedOption, setSelectedOption] = useState('')

  const handleOptionChange = (event) => {
    setSelectedOption(event.target.value)
  }

  return (
    <DropdownContainer dropdownWidth={dropdownWidth} listWidth={listWidth}>
      <Controller
        name={text}
        control={control}
        defaultValue=""
        render={({ field }) => (
          <StyledDropdown
            {...field}
            onChange={handleOptionChange}
            value={selectedOption}
            marginRight={marginRight}
            selected={selectedOption !== ''}
          >
            <option value="" disabled>
              {text}
            </option>
            {options.map((option, index) => (
              <option key={index} value={option}>
                {option}
              </option>
            ))}
          </StyledDropdown>
        )}
      />
    </DropdownContainer>
  )
}

export default Dropdown
