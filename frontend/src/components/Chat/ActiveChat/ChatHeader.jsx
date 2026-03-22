import { useSelector } from 'react-redux';
import { Spinner } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../../store/messagesSlice';

export function ChatHeader({ connectionStatus }) {
  const { currentChannelId } = useSelector((state) => state.channels);
  const { items: channels } = useSelector((state) => state.channels);
  
  const currentChannel = channels.find((ch) => ch.id === currentChannelId);
  const channelName = currentChannel?.name || 'Чат';

  return (
    <div className="bg-light d-flex justify-content-between align-items-center">
      <h5 className="mb-0">{channelName}</h5>
      {connectionStatus !== CONNECTION_STATUS.CONNECTED && (
        <Spinner animation="border" size="sm" variant="warning" />
      )}
    </div>
  );
}
