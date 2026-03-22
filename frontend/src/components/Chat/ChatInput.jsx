import { useState } from 'react';
import { Form, Button, Spinner } from 'react-bootstrap';

import { ConnectionStatus } from './ConnectionStatus';
import { CONNECTION_STATUS } from '../../store/messagesSlice';

export function ChatInput({ onSendMessage, isSending, connectionStatus }) {
  const [messageText, setMessageText] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!messageText.trim() || isSending) return;

    const success = await onSendMessage(messageText.trim());
    if (success) {
      setMessageText('');
    }
  };

  const isDisabled = isSending || connectionStatus === CONNECTION_STATUS.DISCONNECTED;

  return (
    <div className="bg-light p-3">
      <ConnectionStatus status={connectionStatus} />
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
