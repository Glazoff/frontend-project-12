import { useSelector } from 'react-redux';
import { Card } from 'react-bootstrap';

import { ChatHeader } from './ChatHeader';
import { ChatMessages } from './ChatMessages';
import { ChatInput } from './ChatInput';

export function ActiveChat() {
  const { connectionStatus } = useSelector((state) => state.messages);

  return (
    <Card className="h-100 border-0">
      <ChatHeader connectionStatus={connectionStatus} />
      <Card.Body className="d-flex flex-column p-0">
        <div className="flex-grow-1 overflow-auto p-3">
          <ChatMessages />
        </div>
        <ChatInput connectionStatus={connectionStatus} />
      </Card.Body>
    </Card>
  );
}
