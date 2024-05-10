import { useState, useEffect, useRef } from 'react'
import styled from 'styled-components'
import ArrowDropDownIcon from '@mui/icons-material/ArrowDropDown'

const DropdownContainer = styled.div`
  position: relative;
  display: inline-block;
`

const DropdownButton = styled.button`
  background-color: transparent;
  padding: 10px;
  font-size: 14px;
  border: 2px solid #c1e3e3;
  color: #999;
  border-radius: 5px;
  cursor: pointer;
  display: flex;
  justify-content: space-between;
  align-items: center;
  width: ${(props) => props.dropdownWidth || '200px'};
  height: 45px;
  margin-right: ${(props) => props.marginRight || '0px'};
`

const DropdownContent = styled.div`
  display: ${(props) => (props.open ? 'block' : 'none')};
  position: absolute;
  background-color: ${(props) => props.theme.colors.white};
  width: ${(props) => props.listWidth || '200px'};
  max-height: 200px;
  overflow: auto;
  box-shadow: 0px 8px 16px 0px rgba(0, 0, 0, 0.2);
  z-index: 999;
  color: ${(props) => props.theme.colors.black};
  font-size: 14px;
`

const DropdownItem = styled.div`
  padding: 12px 16px;
  text-decoration: none;
  display: block;
  cursor: pointer;

  &:hover {
    background-color: #c9c9c96a;
  }
`

const Dropdown = ({ options, text, dropdownWidth, listWidth, marginRight }) => {
  const [isOpen, setIsOpen] = useState(false)
  const [selectedOption, setSelectedOption] = useState(null)
  const dropdownRef = useRef(null)

  const toggleDropdown = () => {
    setIsOpen(!isOpen)
  }

  const handleOptionClick = (option) => {
    setSelectedOption(option)
    setIsOpen(false)
  }

  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsOpen(false)
    }
  }

  useEffect(() => {
    document.addEventListener('mousedown', handleClickOutside)
    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [])

  return (
    <DropdownContainer dropdownWidth={dropdownWidth} listWidth={listWidth} ref={dropdownRef}>
      <DropdownButton onClick={toggleDropdown} marginRight={marginRight}>
        {selectedOption || text}
        <ArrowDropDownIcon style={{ color: '#999' }} />
      </DropdownButton>
      <DropdownContent open={isOpen}>
        {options.map((option, index) => (
          <DropdownItem key={index} onClick={() => handleOptionClick(option)}>
            {option}
          </DropdownItem>
        ))}
      </DropdownContent>
    </DropdownContainer>
  )
}

export default Dropdown
