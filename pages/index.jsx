import { useState } from 'react'
import EventModal from '../src/components/modals/EventModal'

export default function HomePage() {
  const [openModal, setOpenModal] = useState(false)

  // Função para fechar o modal
  const handleCloseModal = () => {
    setOpenModal(false)
  }

  return (
    <div>
      {/* Botão para abrir o modal */}
      <button onClick={() => setOpenModal(true)}>Abrir o modal</button>

      {/* Renderização condicional do modal */}
      {openModal && <EventModal isOpen={openModal} onClose={handleCloseModal} />}
    </div>
  )
}
