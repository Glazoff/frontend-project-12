import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Button } from 'react-bootstrap';
import { useTranslation } from 'react-i18next';
import { RemoveChannelModal } from '../RemoveChannelModal';
import { RenameChannelModal } from '../RenameChannelModal';
import { removeChannel as removeChannelApi, editChannel as editChannelApi } from '../../../api/channels';
import { removeChannel } from '../../../store/channelsSlice';
import { useToastNotifications } from '../../ToastNotification';

export function ChatHeader() {
  const { t } = useTranslation();
  const dispatch = useDispatch();
  const { showToast } = useToastNotifications();
  const { items: channels, currentChannelId } = useSelector((state) => state.channels);
  const [showRemoveModal, setShowRemoveModal] = useState(false);
  const [showRenameModal, setShowRenameModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isRenaming, setIsRenaming] = useState(false);

  const currentChannel = channels.find((ch) => ch.id === currentChannelId);

  const handleOpenRemoveModal = () => setShowRemoveModal(true);
  const handleCloseRemoveModal = () => setShowRemoveModal(false);
  const handleOpenRenameModal = () => setShowRenameModal(true);
  const handleCloseRenameModal = () => setShowRenameModal(false);

  const handleConfirmDelete = async () => {
    if (!currentChannel) return;
    setIsDeleting(true);
    try {
      await removeChannelApi(currentChannel.id);
      dispatch(removeChannel({ id: currentChannel.id }));
      handleCloseRemoveModal();
      showToast.success(t('chat.notifications.channelDeleted', { name: currentChannel.name }));
    } catch (err) {
      console.error('Failed to delete channel:', err);
      showToast.error(t('chat.notifications.channelDeleteError'));
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmRename = async (newName) => {
    if (!currentChannel || !newName) return;
    setIsRenaming(true);
    try {
      await editChannelApi(currentChannel.id, { name: newName });
      showToast.success(t('chat.notifications.channelRenamed', { name: newName }));
    } catch (err) {
      console.error('Failed to rename channel:', err);
      showToast.error(t('chat.notifications.channelRenameError'));
      throw err;
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <>
      <div className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0"># {currentChannel?.name || t('chat.chatHeader.defaultName')}</h5>
        <div className="d-flex align-items-center gap-2">
          {currentChannel?.removable && (
            <>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleOpenRenameModal}
                disabled={isRenaming || isDeleting}
              >
                {t('common.buttons.rename')}
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleOpenRemoveModal}
                disabled={isRenaming || isDeleting}
              >
                {t('common.buttons.delete')}
              </Button>
            </>
          )}
        </div>
      </div>
      <RenameChannelModal
        show={showRenameModal}
        handleClose={handleCloseRenameModal}
        handleConfirm={handleConfirmRename}
        channel={currentChannel}
        isRenaming={isRenaming}
      />
      <RemoveChannelModal
        show={showRemoveModal}
        handleClose={handleCloseRemoveModal}
        handleConfirm={handleConfirmDelete}
        channelName={currentChannel?.name}
        isDeleting={isDeleting}
      />
    </>
  );
}
