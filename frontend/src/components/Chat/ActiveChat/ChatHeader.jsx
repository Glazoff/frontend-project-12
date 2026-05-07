import { useSelector } from 'react-redux'
import { useTranslation } from 'react-i18next'

export function ChatHeader() {
  const { t } = useTranslation()
  const { items: channels, currentChannelId } = useSelector(state => state.channels)

  const currentChannel = channels.find(ch => ch.id === currentChannelId)

  return (
    <div className="bg-light p-2 border-bottom">
      <h5 className="mb-0">
        #
        {currentChannel?.name || t('chat.chatHeader.defaultName')}
      </h5>
    </div>
  )
}
