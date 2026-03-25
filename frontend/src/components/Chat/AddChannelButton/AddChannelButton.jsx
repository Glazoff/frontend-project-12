import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

export function AddChannelButton({ onClick }) {
  const { t } = useTranslation();

  return (
    <Button variant="link" className="p-0 text-decoration-none" onClick={onClick}>
      <img src="/plus.svg" alt={t('chat.layout.addChannel')} width="20" height="20" />
    </Button>
  );
}
