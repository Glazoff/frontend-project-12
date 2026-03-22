import { Alert } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../store/messagesSlice';

export function ConnectionStatus({ status }) {
  if (status === CONNECTION_STATUS.DISCONNECTED) {
    return (
      <Alert variant="warning" className="mb-2">
        <small>Нет соединения с сервером. Попытка переподключения...</small>
      </Alert>
    );
  }

  if (status === CONNECTION_STATUS.RECONNECTING) {
    return (
      <Alert variant="info" className="mb-2">
        <small>Переподключение к серверу...</small>
      </Alert>
    );
  }

  return null;
}
