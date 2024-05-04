import styled from 'styled-components'

const StyledH1 = styled.h1`
  font-size: 60px;
`

export default function H1({ children }) {
  return <StyledH1>{children}</StyledH1>
}
