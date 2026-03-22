import { useEffect, useState, useRef } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button, Alert, Spinner } from 'react-bootstrap';

import { ChannelList } from './ChannelList';
import { getChannels } from '../api/channels';
import { getMessages } from '../api/messages';
import { sendMessage as sendMessageApi } from '../api/messages';
import { initSocket } from '../api/socket';
import { setChannels, setLoading as setChannelsLoading, setError as setChannelsError, addChannel, removeChannel, renameChannel } from '../store/channelsSlice';
import { setMessages, setLoading as setMessagesLoading, setError as setMessagesError, addNewMessage, setConnectionStatus } from '../store/messagesSlice';
import { useAuth } from '../hooks/useAuth';

const DEFAULT_CHANNEL_ID = '1'; // General channel

export function Chat() {
  const dispatch = useDispatch();
  const { token } = useAuth();
  const { items: messages, loading: messagesLoading, error: messagesError, connectionStatus } = useSelector((state) => state.messages);
  const { loading: channelsLoading, error: channelsError } = useSelector((state) => state.channels);
  const [messageText, setMessageText] = useState('');
  const [isSending, setIsSending] = useState(false);
  const messagesEndRef = useRef(null);

  useEffect(() => {
    const socket = initSocket(token);

    // Subscribe to socket events
    socket.on('newMessage', (payload) => {
      dispatch(addNewMessage(payload));
    });

    socket.on('newChannel', (payload) => {
      dispatch(addChannel(payload));
    });

    socket.on('removeChannel', (payload) => {
      dispatch(removeChannel(payload));
    });

    socket.on('renameChannel', (payload) => {
      dispatch(renameChannel(payload));
    });

    socket.on('disconnect', () => {
      dispatch(setConnectionStatus('disconnected'));
    });

    socket.on('connect', () => {
      dispatch(setConnectionStatus('connected'));
    });

    socket.on('reconnecting', () => {
      dispatch(setConnectionStatus('reconnecting'));
    });

    return () => {
      socket.off('newMessage');
      socket.off('newChannel');
      socket.off('removeChannel');
      socket.off('renameChannel');
      socket.off('disconnect');
      socket.off('connect');
      socket.off('reconnecting');
    };
  }, [dispatch, token]);

  useEffect(() => {
    const fetchData = async () => {
      dispatch(setChannelsLoading(true));
      dispatch(setMessagesLoading(true));
      try {
        const [channelsData, messagesData] = await Promise.all([
          getChannels(),
          getMessages(),
        ]);
        dispatch(setChannels(channelsData));
        dispatch(setMessages(messagesData));
      } catch (err) {
        dispatch(setChannelsError(err.message));
        dispatch(setMessagesError(err.message));
      } finally {
        dispatch(setChannelsLoading(false));
        dispatch(setMessagesLoading(false));
      }
    };

    fetchData();
  }, [dispatch]);

  useEffect(() => {
    // Scroll to bottom when new messages arrive
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSendMessage = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || isSending) return;

    setIsSending(true);
    const newMessage = {
      body: messageText.trim(),
      channelId: DEFAULT_CHANNEL_ID,
    };

    try {
      await sendMessageApi(newMessage);
      setMessageText('');
    } catch (err) {
      console.error('Failed to send message:', err);
      // Message will still be received via socket if server processed it
    } finally {
      setIsSending(false);
    }
  };

  const renderConnectionStatus = () => {
    if (connectionStatus === 'disconnected') {
      return (
        <Alert variant="warning" className="mb-2">
          <small>Нет соединения с сервером. Попытка переподключения...</small>
        </Alert>
      );
    }
    if (connectionStatus === 'reconnecting') {
      return (
        <Alert variant="info" className="mb-2">
          <small>Переподключение к серверу...</small>
        </Alert>
      );
    }
    return null;
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
              {channelsLoading ? (
                <div className="text-center p-3">
                  <Spinner animation="border" size="sm" />
                </div>
              ) : channelsError ? (
                <div className="text-danger p-3">Ошибка: {channelsError}</div>
              ) : (
                <ChannelList />
              )}
            </Card.Body>
          </Card>
        </Col>
        <Col xs={9}>
          <Card className="h-100 border-0">
            <Card.Header className="bg-light d-flex justify-content-between align-items-center">
              <h5 className="mb-0">Чат</h5>
              {connectionStatus !== 'connected' && (
                <Spinner animation="border" size="sm" variant="warning" />
              )}
            </Card.Header>
            <Card.Body className="d-flex flex-column p-0">
              <div className="flex-grow-1 overflow-auto p-3">
                {messagesLoading ? (
                  <div className="text-center">
                    <Spinner animation="border" />
                    <div className="mt-2">Загрузка сообщений...</div>
                  </div>
                ) : messagesError ? (
                  <Alert variant="danger">Ошибка: {messagesError}</Alert>
                ) : messages.length === 0 ? (
                  <div className="text-center text-muted">Сообщений пока нет</div>
                ) : (
                  <ul className="list-unstyled mb-0">
                    {messages.map((message) => (
                      <li key={message.id} className="mb-2">
                        <strong>{message.username}</strong>
                        <span className="text-muted ms-2">
                          [{new Date(message.createdAt).toLocaleTimeString()}]
                        </span>
                        <div>{message.body}</div>
                      </li>
                    ))}
                    <div ref={messagesEndRef} />
                  </ul>
                )}
              </div>
              <Card.Footer className="bg-light p-3">
                {renderConnectionStatus()}
                <Form className="d-flex gap-2" onSubmit={handleSendMessage}>
                  <Form.Control
                    type="text"
                    placeholder="Введите сообщение..."
                    value={messageText}
                    onChange={(e) => setMessageText(e.target.value)}
                    disabled={isSending || connectionStatus === 'disconnected'}
                  />
                  <Button
                    type="submit"
                    variant="primary"
                    disabled={isSending || !messageText.trim() || connectionStatus === 'disconnected'}
                  >
                    {isSending ? <Spinner animation="border" size="sm" /> : 'Отправить'}
                  </Button>
                </Form>
              </Card.Footer>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
