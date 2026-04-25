import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export function ChatMessages() {
  const { t } = useTranslation()
  const { items: messages, loading, error } = useSelector(state => state.messages)
  const { currentChannelId } = useSelector(state => state.channels)

  const channelMessages = messages.filter(msg => msg.channelId === currentChannelId)

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
    <ul className="list-unstyled mb-0">
      {channelMessages.map(message => (
        <li key={message.id} className="mb-2">
          <strong>
            {message.username}
            :
          </strong>
          {' '}
          {message.body}
        </li>
      ))}
    </ul>
  )
}
