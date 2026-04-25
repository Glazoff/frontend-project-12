import { Card } from 'react-bootstrap'

import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'

export function ActiveChat() {
  return (
    <Card className="h-100 border-0">
      <ChatHeader />
      <Card.Body className="d-flex flex-column p-0">
        <div className="flex-grow-1 overflow-auto p-3">
          <ChatMessages />
        </div>
        <ChatInput />
      </Card.Body>
    </Card>
  )
}
