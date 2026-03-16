import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap';

import { ChannelList } from './ChannelList';
import { getChannels } from '../api/channels';
import { getMessages } from '../api/messages';
import { setChannels, setLoading as setChannelsLoading, setError as setChannelsError } from '../store/channelsSlice';
import { setMessages, setLoading as setMessagesLoading, setError as setMessagesError } from '../store/messagesSlice';

export function Chat() {
  const dispatch = useDispatch();
  const { items: messages, loading: messagesLoading } = useSelector((state) => state.messages);

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

  return (
    <Container fluid className="h-100">
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
          <Card className="h-100 border-0">
            <Card.Header className="bg-light">
              <h5 className="mb-0">Чат</h5>
            </Card.Header>
            <Card.Body className="d-flex flex-column p-0">
              <div className="flex-grow-1 overflow-auto p-3">
                {messagesLoading ? (
                  <div className="text-center">Загрузка сообщений...</div>
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
                  </ul>
                )}
              </div>
              <Card.Footer className="bg-light p-3">
                <Form className="d-flex gap-2">
                  <Form.Control type="text" placeholder="Введите сообщение..." />
                  <Button type="submit" variant="primary">
                    Отправить
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
