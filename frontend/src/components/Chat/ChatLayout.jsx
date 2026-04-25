import { useState } from 'react'
import { Container, Row, Col, Card } from 'react-bootstrap'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

import { ChannelList } from './ChannelList'
import { ActiveChat } from './ActiveChat'
import { ConnectionStatusAlert } from './ConnectionStatusAlert'
import { AddChannelButton } from './AddChannelButton'
import { AddChannelModal } from './AddChannelModal'

export function ChatLayout() {
  const { connectionStatus } = useSelector(state => state.messages)
  const [showModal, setShowModal] = useState(false)
  const { t } = useTranslation()

  const handleOpenModal = () => setShowModal(true)
  const handleCloseModal = () => setShowModal(false)

  return (
    <>
      <Container fluid className="h-100">
        <ConnectionStatusAlert status={connectionStatus} />
        <Row className="h-100 g-0">
          <Col xs={3} className="border-end">
            <Card className="h-100 border-0">
              <Card.Header className="bg-light d-flex justify-content-between align-items-center">
                <h5 className="mb-0">{t('chat.layout.channels')}</h5>
                <AddChannelButton onClick={handleOpenModal} />
              </Card.Header>
              <Card.Body className="p-0 overflow-auto">
                <ChannelList />
              </Card.Body>
            </Card>
          </Col>
          <Col xs={9}>
            <ActiveChat />
          </Col>
        </Row>
      </Container>
      <AddChannelModal show={showModal} handleClose={handleCloseModal} />
    </>
  )
}
