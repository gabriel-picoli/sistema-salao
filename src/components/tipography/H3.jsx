import styled from 'styled-components'

const StyledH3 = styled.h1`
  font-size: 30px;
  font-weight: 900;
`

export default function H1({ children }) {
  return <StyledH3>{children}</StyledH3>
}
