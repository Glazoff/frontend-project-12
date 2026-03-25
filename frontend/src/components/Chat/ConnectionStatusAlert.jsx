import { Alert } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { CONNECTION_STATUS } from '../../constants';

export function ConnectionStatusAlert({ status }) {
  const { t } = useTranslation();

  if (status === CONNECTION_STATUS.DISCONNECTED) {
    return (
      <Alert variant="warning" className="mb-0">
        <small>{t('chat.connectionStatus.disconnected')}</small>
      </Alert>
    );
  }
  if (status === CONNECTION_STATUS.RECONNECTING) {
    return (
      <Alert variant="info" className="mb-0">
        <small>{t('chat.connectionStatus.reconnecting')}</small>
      </Alert>
    );
  }
  return null;
}
