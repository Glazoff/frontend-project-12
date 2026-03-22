import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../../constants';
import { RemoveChannelModal } from '../RemoveChannelModal';
import { removeChannel as removeChannelApi } from '../../../api/channels';
import { removeChannel, setCurrentChannelId } from '../../../store/channelsSlice';
import { removeMessagesByChannelId } from '../../../store/messagesSlice';
import { GENERAL_CHANNEL_ID } from '../../../constants';

export function ChatHeader() {
  const dispatch = useDispatch();
  const { connectionStatus } = useSelector((state) => state.messages);
  const { items: channels, currentChannelId } = useSelector((state) => state.channels);
  const [showRemoveModal, setShowRemoveModal] = useState(false);

  const currentChannel = channels.find((ch) => ch.id === currentChannelId);

  const handleOpenRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  const handleConfirmDelete = async () => {
    if (!currentChannel) return;
    try {
      await removeChannelApi(currentChannel.id);
      dispatch(removeChannel({ id: currentChannel.id }));
      dispatch(removeMessagesByChannelId(currentChannel.id));
      dispatch(setCurrentChannelId(GENERAL_CHANNEL_ID));
      handleCloseRemoveModal();
    } catch (err) {
      console.error('Failed to delete channel:', err);
    }
  };

  return (
    <>
      <div className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0">{currentChannel?.name || 'Чат'}</h5>
        <div className="d-flex align-items-center gap-2">
          {connectionStatus !== CONNECTION_STATUS.CONNECTED && (
            <Spinner animation="border" size="sm" variant="warning" />
          )}
          {currentChannel?.removable && (
            <Button
              variant="danger"
              size="sm"
              onClick={handleOpenRemoveModal}
            >
              Delete
            </Button>
          )}
        </div>
      </div>
      <RemoveChannelModal
        show={showRemoveModal}
        handleClose={handleCloseRemoveModal}
        handleConfirm={handleConfirmDelete}
        channelName={currentChannel?.name}
      />
    </>
  );
}
