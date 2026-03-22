import { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Container, Row, Col, Card, Spinner } from 'react-bootstrap';

import { ChannelList } from './ChannelList';
import { ChatMessageList } from './ChatMessageList';
import { ChatInput } from './ChatInput';
import { useSocket } from '../../hooks/useSocket';
import { useChat } from '../../hooks/useChat';
import { useAuth } from '../../hooks/useAuth';
import { CONNECTION_STATUS } from '../../store/messagesSlice';

const DEFAULT_CHANNEL_ID = '1';

function ChannelsSection() {
  const { loading, error } = useSelector((state) => state.channels);

  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger p-3">Ошибка: {error}</div>;
  }

  return <ChannelList />;
}

export function Chat() {
  const { token } = useAuth();
  const { items: messages, loading: messagesLoading, error: messagesError, connectionStatus } = useSelector((state) => state.messages);

  const { fetchData, sendMessage, isSending } = useChat();
  useSocket(token);

  useEffect(() => {
    fetchData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSendMessage = async (text) => {
    const messageData = {
      body: text,
      channelId: DEFAULT_CHANNEL_ID,
    };
    return sendMessage(messageData);
  };

  return (
    <Container fluid className="h-100">
      <Row className="h-100 g-0">
        <Col xs={3} className="border-end">
          <Card className="h-100 border-0">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Каналы</h5>
            </Card.Header>
            <Card.Body className="p-0 overflow-auto">
              <ChannelsSection />
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9}>
          <Card className="h-100 border-0">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Чат</h5>
              {connectionStatus !== CONNECTION_STATUS.CONNECTED && (
                <Spinner animation="border" size="sm" variant="warning" />
              )}
            </Card.Header>
            <Card.Body className="d-flex flex-column p-0">
              <div className="flex-grow-1 overflow-auto p-3">
                <ChatMessageList
                  messages={messages}
                  loading={messagesLoading}
                  error={messagesError}
                />
              </div>
              <ChatInput
                onSendMessage={handleSendMessage}
                isSending={isSending}
                connectionStatus={connectionStatus}
              />
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
