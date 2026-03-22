import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../../store/messagesSlice';
import { useChat } from '../../../hooks/useChat.jsx';

const DEFAULT_CHANNEL_ID = '1';

export function ChatInput({ connectionStatus }) {
  const [messageText, setMessageText] = useState('');
  const { sendMessage, isSending } = useChat();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || isSending) return;

    const messageData = {
      body: messageText.trim(),
      channelId: DEFAULT_CHANNEL_ID,
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
