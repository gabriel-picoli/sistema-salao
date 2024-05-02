import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  background: url('${(props) => props.image}');
  background-position: center;
  background-size: cover;
  background-repeat: no-repeat;
  border-radius: 50px;
  width: 65px;
  height: 65px;
`

const Name = styled.span`
  margin-top: 5px;
  font-size: 14px;
`

export default function ProfilePic({ image, name }) {
  return (
    <Container>
      <Image src={image} alt="Profile" />
      <Name>{name}</Name>
    </Container>
  )
}
