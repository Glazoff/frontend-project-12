import { useEffect, useRef } from 'react'
import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export function ChatMessages() {
  const messagesEndRef = useRef(null);

  const { t } = useTranslation()
  const { items: messages, loading, error } = useSelector(state => state.messages)
  const { currentChannelId } = useSelector(state => state.channels)

  const channelMessages = messages.filter(msg => msg.channelId === currentChannelId)

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    console.log(messages)
  }, [messages])

  if (loading) {
    return (
      <div className="text-center">
        <div className="spinner-border" role="status">
          <span className="visually-hidden">{t('chat.chatMessages.loadingLabel')}</span>
        </div>
        <div className="mt-2">{t('chat.chatMessages.loading')}</div>
      </div>
    )
  }

  if (error) {
    return <div className="alert alert-danger">{t('chat.chatMessages.error', { error })}</div>
  }

  if (channelMessages.length === 0) {
    return <div className="text-center text-muted">{t('chat.chatMessages.noMessages')}</div>
  }

  return (
    <div className="h-100 overflow-y-auto d-flex flex-column-reverse mb-0 p-2">
      <div ref={messagesEndRef} /> 
      {[...channelMessages].reverse().map(message => (
        <div  key={message.id} className="mb-2">
          <strong>
          {message.username}
            :
          </strong>
          {' '}
          {message.body}
        </div>
      ))}
    </div>
  )
}
