import styled from 'styled-components'

const StyledH2 = styled.h1`
  font-size: 40px;
  font-weight: 900;
`

export default function H1({ children }) {
  return <StyledH2>{children}</StyledH2>
}
