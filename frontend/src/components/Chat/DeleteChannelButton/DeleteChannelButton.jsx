import { useTranslation } from 'react-i18next'

export function DeleteChannelButton({ onClick }) {
  const { t } = useTranslation()

  return (
    <span
      role="button"
      tabIndex={0}
      onClick={onClick}
      onKeyDown={(e) => {
        if (e.key === 'Enter' || e.key === ' ') {
          onClick(e)
        }
      }}
      className="delete-button"
      onMouseEnter={(e) => {
        e.currentTarget.style.opacity = 1
      }}
      onMouseLeave={(e) => {
        e.currentTarget.style.opacity = 0
      }}
    >
      {t('chat.deleteChannelButton.label')}
    </span>
  )
}
