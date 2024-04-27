import styled from 'styled-components'

const StyledButton = styled.button`
  border: none;
  background-color: ${(props) => props.theme[props.backgroundColor] || props.theme.colors.primary};
  margin-left: ${(props) => props.marginLeft || '0px'};
  transition: all 0.2s ease-in-out;
  border-radius: 10px;
  min-width: 150px;
  min-height: 40px;
  padding: 10px;
  display: flex;
  justify-content: center;
  align-items: center;
  color: ${(props) => props.theme.colors.white};
  cursor: pointer;

  &:hover {
    background-color: #4d9291c5;
  }
`

const ButtonText = styled.p`
  font-size: 16px;
  width: 100px;
  font-weight: bold;
`

export default function Button({ children, backgroundColor, marginLeft, onClick }) {
  return (
    <StyledButton backgroundColor={backgroundColor} marginLeft={marginLeft} onClick={onClick}>
      <ButtonText>{children}</ButtonText>
    </StyledButton>
  )
}
