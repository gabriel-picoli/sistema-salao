import { useState } from 'react'

import EventModal from '../src/components/modals/EventModal'

export default function HomePage() {
  const [modalVisible, setModalVisible] = useState(true)

  return <EventModal open={modalVisible} onClose={setModalVisible} />
}
