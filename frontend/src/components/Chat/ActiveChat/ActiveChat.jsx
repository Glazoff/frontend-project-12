import { Card } from 'react-bootstrap'

import { ChatHeader } from './ChatHeader'
import { ChatMessages } from './ChatMessages'
import { ChatInput } from './ChatInput'

export function ActiveChat() {
  return (
    <Card className="d-flex flex-column h-100 border-0">
      <ChatHeader />
      <ChatMessages />
      <ChatInput />
    </Card>
  )
}
