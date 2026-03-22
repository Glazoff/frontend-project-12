import { Container, Row, Col, Card } from 'react-bootstrap';
import { useSelector } from 'react-redux';

import { ChannelList } from './ChannelList';
import { ActiveChat } from './ActiveChat';
import { ConnectionStatusAlert } from './ConnectionStatusAlert';

export function ChatLayout() {
  const { connectionStatus } = useSelector((state) => state.messages);

  return (
    <Container fluid className="h-100">
      <ConnectionStatusAlert status={connectionStatus} />
      <Row className="h-100 g-0">
        <Col xs={3} className="border-end">
          <Card className="h-100 border-0">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Каналы</h5>
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
  );
}
