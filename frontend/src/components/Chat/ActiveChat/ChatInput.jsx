import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Form, Button, Spinner } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../../store/messagesSlice';
import { useChat } from '../../../hooks/useChat.jsx';

export function ChatInput({ connectionStatus }) {
  const [messageText, setMessageText] = useState('');
  const { sendMessage, isSending } = useChat();
  const { currentChannelId } = useSelector((state) => state.channels);
  const { username } = useSelector((state) => state.user);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || isSending) return;

    const messageData = {
      body: messageText.trim(),
      channelId: currentChannelId,
      username: username || 'anonymous',
    };

    const success = await sendMessage(messageData);
    if (success) {
      setMessageText('');
    }
  };

  const isDisabled = isSending || connectionStatus === CONNECTION_STATUS.DISCONNECTED;

  return (
    <div className="bg-light p-3">
      <Form className="d-flex gap-2" onSubmit={handleSubmit}>
        <Form.Control
          type="text"
          placeholder="Введите сообщение..."
          value={messageText}
          onChange={(e) => setMessageText(e.target.value)}
          disabled={isDisabled}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isDisabled || !messageText.trim()}
        >
          {isSending ? <Spinner animation="border" size="sm" /> : 'Отправить'}
        </Button>
      </Form>
    </div>
  );
}
