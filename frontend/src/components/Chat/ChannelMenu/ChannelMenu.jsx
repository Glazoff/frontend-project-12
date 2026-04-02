import { useState } from 'react';
import { useDispatch } from 'react-redux';
import { Dropdown, Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';

import { removeChannel as removeChannelApi, editChannel as editChannelApi } from '../../../api/channels';
import { removeChannel } from '../../../store/channelsSlice';
import { RenameChannelModal } from '../RenameChannelModal';
import { RemoveChannelModal } from '../RemoveChannelModal';
import { useToastNotifications } from '../../ToastNotification';

export function ChannelMenu({ channel }) {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showToast } = useToastNotifications();
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleOpenRenameModal = () => setShowRenameModal(true);
  const handleCloseRenameModal = () => setShowRenameModal(false);
  const handleOpenRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);

  const handleConfirmRename = async (newName) => {
    if (!channel || !newName) return;
    setIsRenaming(true);
    try {
      await editChannelApi(channel.id, { name: newName });
      showToast.success(t('chat.notifications.channelRenamed', { name: newName }));
      handleCloseRenameModal();
    } catch (err) {
      console.error('Failed to rename channel:', err);
      showToast.error(t('chat.notifications.channelRenameError'));
      throw err;
    } finally {
      setIsRenaming(false);
    }
  };

  const handleConfirmDelete = async () => {
    if (!channel) return;
    setIsDeleting(true);
    try {
      await removeChannelApi(channel.id);
      dispatch(removeChannel({ id: channel.id }));
      handleCloseRemoveModal();
      showToast.success(t('chat.notifications.channelDeleted', { name: channel.name }));
    } catch (err) {
      console.error('Failed to delete channel:', err);
      showToast.error(t('chat.notifications.channelDeleteError'));
    } finally {
      setIsDeleting(false);
    }
  };

  return (
    <>
      <Dropdown align="start">
        <Dropdown.Toggle variant="outline-secondary" size="sm" id="channel-menu-dropdown">
          {t('chat.chatHeader.manageChannel')}
        </Dropdown.Toggle>

        <Dropdown.Menu>
          <Dropdown.Item onClick={handleOpenRenameModal}>
            {t('common.buttons.rename')}
          </Dropdown.Item>
          <Dropdown.Item onClick={handleOpenRemoveModal}>
            {t('common.buttons.delete')}
          </Dropdown.Item>
        </Dropdown.Menu>
      </Dropdown>

      <RenameChannelModal
        show={showRenameModal}
        handleClose={handleCloseRenameModal}
        handleConfirm={handleConfirmRename}
        channel={channel}
        isRenaming={isRenaming}
      />
      <RemoveChannelModal
        show={showRemoveModal}
        handleClose={handleCloseRemoveModal}
        handleConfirm={handleConfirmDelete}
        channelName={channel?.name}
        isDeleting={isDeleting}
      />
    </>
  );
}
