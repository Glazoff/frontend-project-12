import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { Form, Button, Spinner } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

import { CONNECTION_STATUS } from '../../../constants'
import { useChat } from '../../../hooks/useChat.jsx'
import { useAuth } from '../../../hooks/useAuth'
import { profanityFilter } from '../../../utils/profanityFilter'

export function ChatInput() {
  const { t } = useTranslation()
  const [messageText, setMessageText] = useState('')
  const { sendMessage, isSending } = useChat()
  const { currentChannelId } = useSelector(state => state.channels)
  const { username } = useAuth()
  const { connectionStatus } = useSelector(state => state.messages)
  const inputRef = useRef(null)

  useEffect(() => {
    if (!isSending) {
      inputRef.current?.focus()
    }
  }, [isSending])

  const handleSubmit = async (e) => {
    e.preventDefault()
    if (!messageText.trim() || isSending) return

    const filteredMessage = profanityFilter.filter(messageText.trim())
    const messageData = {
      body: filteredMessage,
      channelId: currentChannelId,
      username: username || 'anonymous',
    }

    const success = await sendMessage(messageData)
    if (success) {
      setMessageText('')
    }
  }

  const isDisabled = isSending || connectionStatus === CONNECTION_STATUS.DISCONNECTED

  return (
    <div className="bg-light p-3">
      <Form className="d-flex gap-2" onSubmit={handleSubmit}>
        <label htmlFor="messageInput" style={{ position: 'absolute', width: 1, height: 1, padding: 0, margin: -1, overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', border: 0 }}>
          {t('chat.chatInput.label')}
        </label>
        <Form.Control
          aria-label="Новое сообщение"
          ref={inputRef}
          id="messageInput"
          type="text"
          placeholder={t('chat.chatInput.placeholder')}
          value={messageText}
          onChange={e => setMessageText(e.target.value)}
          disabled={isDisabled}
        />
        <Button
          type="submit"
          variant="primary"
          disabled={isDisabled || !messageText.trim()}
        >
          {isSending ? <Spinner animation="border" size="sm" /> : t('common.buttons.send')}
        </Button>
      </Form>
    </div>
  )
}
