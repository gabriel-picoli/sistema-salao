import styled from 'styled-components'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
`

const Image = styled.img`
  background: url('${(props) => props.image}');
  background-position: center;
  background-size: contain;
  background-repeat: no-repeat;
  border-radius: 50px;
  width: 70px;
  height: 70px;
`

const Name = styled.span`
  margin-top: 5px;
  font-size: 15px;
`

export default function ProfilePic({ image, name }) {
  return (
    <Container>
      <Image src={image} alt="Profile" />
      <Name>{name}</Name>
    </Container>
  )
}
