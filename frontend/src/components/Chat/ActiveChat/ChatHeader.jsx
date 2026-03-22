import { Spinner } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../../store/messagesSlice';

export function ChatHeader({ connectionStatus }) {
  return (
    <div className="bg-light d-flex justify-content-between align-items-center">
      <h5 className="mb-0">Чат</h5>
      {connectionStatus !== CONNECTION_STATUS.CONNECTED && (
        <Spinner animation="border" size="sm" variant="warning" />
      )}
    </div>
  );
}
