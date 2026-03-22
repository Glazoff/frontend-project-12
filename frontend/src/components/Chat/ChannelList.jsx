import { useState } from 'react';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useDispatch, useSelector } from 'react-redux';

import { setCurrentChannelId, removeChannel } from '../../store/channelsSlice';
import { removeMessagesByChannelId } from '../../store/messagesSlice';
import { RemoveChannelModal } from './RemoveChannelModal';
import { removeChannel as removeChannelApi } from '../../api/channels';
import { GENERAL_CHANNEL_ID } from '../../constants';

export function ChannelList() {
  const dispatch = useDispatch();
  const { items: channels, loading, error, currentChannelId } = useSelector((state) => state.channels);
  const [channelToDelete, setChannelToDelete] = useState(null);

  const handleSelectChannel = (channelId) => {
    dispatch(setCurrentChannelId(channelId));
  };

  const handleCloseModal = () => {
    setChannelToDelete(null);
  };

  const handleConfirmDelete = async () => {
    if (!channelToDelete) return;
    try {
      await removeChannelApi(channelToDelete.id);
      dispatch(removeChannel({ id: channelToDelete.id }));
      dispatch(removeMessagesByChannelId(channelToDelete.id));
      dispatch(setCurrentChannelId(GENERAL_CHANNEL_ID));
      handleCloseModal();
    } catch (err) {
      console.error('Failed to delete channel:', err);
    }
  };

  if (loading) {
    return (
      <div className="text-center p-3">
        <Spinner animation="border" size="sm" />
      </div>
    );
  }

  if (error) {
    return <div className="text-danger p-3">Ошибка: {error}</div>;
  }

  return (
    <>
      <ListGroup variant="flush">
        {channels.map((channel) => (
          <ListGroup.Item
            key={channel.id}
            action
            active={channel.id === currentChannelId}
            onClick={() => handleSelectChannel(channel.id)}
          >
            {channel.name}
          </ListGroup.Item>
        ))}
      </ListGroup>
      <RemoveChannelModal
        show={!!channelToDelete}
        handleClose={handleCloseModal}
        handleConfirm={handleConfirmDelete}
        channelName={channelToDelete?.name}
      />
    </>
  );
}
