import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { ListGroup, Spinner } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { setCurrentChannelId, removeChannel } from '../../store/channelsSlice';
import { RemoveChannelModal } from './RemoveChannelModal';
import { removeChannel as removeChannelApi } from '../../api/channels';
import { useToastNotifications } from '../ToastNotification';
import { ChannelMenu } from '../Chat/ChannelMenu';

export function ChannelList() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showToast } = useToastNotifications();
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
      handleCloseModal();
      showToast.success(t('chat.notifications.channelDeleted', { name: channelToDelete.name }));
    } catch (err) {
      console.error('Failed to delete channel:', err);
      showToast.error(t('chat.notifications.channelDeleteError'));
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
    return <div className="text-danger p-3">{t('chat.channelList.error', { error })}</div>;
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
            <>
            # {channel.name}
            {channel?.removable && <ChannelMenu channel={channel} />}
            </>
            
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
