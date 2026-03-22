import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Spinner, Button } from 'react-bootstrap';

import { CONNECTION_STATUS } from '../../../constants';
import { RemoveChannelModal } from '../RemoveChannelModal';
import { RenameChannelModal } from '../RenameChannelModal';
import { removeChannel as removeChannelApi, editChannel as editChannelApi } from '../../../api/channels';
import { removeChannel } from '../../../store/channelsSlice';

export function ChatHeader() {
  const dispatch = useDispatch();
  const { connectionStatus } = useSelector((state) => state.messages);
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
    } catch (err) {
      console.error('Failed to delete channel:', err);
    } finally {
      setIsDeleting(false);
    }
  };

  const handleConfirmRename = async (newName) => {
    if (!currentChannel || !newName) return;
    setIsRenaming(true);
    try {
      await editChannelApi(currentChannel.id, { name: newName });
    } catch (err) {
      console.error('Failed to rename channel:', err);
      throw err;
    } finally {
      setIsRenaming(false);
    }
  };

  return (
    <>
      <div className="bg-light d-flex justify-content-between align-items-center">
        <h5 className="mb-0"># {currentChannel?.name || 'Чат'}</h5>
        <div className="d-flex align-items-center gap-2">
          {connectionStatus !== CONNECTION_STATUS.CONNECTED && (
            <Spinner animation="border" size="sm" variant="warning" />
          )}
          {currentChannel?.removable && (
            <>
              <Button
                variant="outline-secondary"
                size="sm"
                onClick={handleOpenRenameModal}
                disabled={isRenaming || isDeleting}
              >
                Rename
              </Button>
              <Button
                variant="danger"
                size="sm"
                onClick={handleOpenRemoveModal}
                disabled={isRenaming || isDeleting}
              >
                Delete
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
