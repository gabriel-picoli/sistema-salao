import { useState } from 'react'
import styled from 'styled-components'
import { FaCalendarAlt } from 'react-icons/fa'
import H2 from '../tipography/H2'
import Button from '../inputs/Button'
import DateNavigator from './DateNavigator'
import CalendarSchedule from '../calendar/CalendarSchedule'
import ProfilePic from '../profile/ProfilePic'

const Container = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 100%;
  min-height: 100vh;
  background-color: ${(props) => props.theme.colors.white};
  padding: 30px 150px;
  overflow: scroll;
`

const ContentContainer = styled.div`
  box-shadow: 0px 1px 3px 0px rgba(0, 0, 0, 0.2);
  width: 100%;
  min-height: 100vh;
  padding: 40px;
`

const HeaderContentContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-around;
`

const ClickCalendar = styled.div`
  cursor: pointer;
`

const ProfilePicContainer = styled.div`
  display: grid;
  grid-template-columns: repeat(10, 1fr);
  align-items: center;
  justify-items: center;
  margin-top: 40px;
  margin-bottom: -30px;
  width: 100%;
  padding-left: 80px;
  padding-right: 20px;
`

export default function Schedule() {
  const [hovered, setHovered] = useState(false)

  return (
    <Container>
      <ContentContainer>
        <HeaderContentContainer>
          <H2>Agenda</H2>
          <ClickCalendar
            onMouseEnter={() => setHovered(true)}
            onMouseLeave={() => setHovered(false)}
            onClick={() => console.log('clicou calendario')}
          >
            <FaCalendarAlt
              size={35}
              style={{
                color: hovered ? '#4d9291c5' : '#64BAB8',
                transition: 'color 0.2s ease-in-out',
                marginLeft: '30px',
                marginRight: '30px'
              }}
            />
          </ClickCalendar>
          <DateNavigator />
          <Button onClick={() => console.log('clicou bloquear horario')}>BLOQUEAR HORÁRIO</Button>
          <Button marginLeft="30px" onClick={() => console.log('clicou ir para comandas')}>
            IR PARA COMANDAS
          </Button>
        </HeaderContentContainer>
        <ProfilePicContainer>
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
          <ProfilePic
            image={'https://i.pinimg.com/550x/7e/31/23/7e31237be7a4fa653864720072eef983.jpg'}
            name={'doguinho'}
          />
        </ProfilePicContainer>
        <CalendarSchedule />
      </ContentContainer>
    </Container>
  )
}
