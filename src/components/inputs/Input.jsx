import styled from 'styled-components'

const StyledInput = styled.input`
  width: ${(props) => props.width || '100%'};
  height: 45px;
  background-color: transparent;
  border: 2px solid #c1e3e3;
  border-radius: 5px;
  padding: 10px;
  font-size: 14px;

  outline: none;

  &::placeholder {
    color: #999;
  }
`

const Input = ({ placeholder, width, value }) => {
  return <StyledInput placeholder={placeholder} width={width} value={value} />
}

export default Input
