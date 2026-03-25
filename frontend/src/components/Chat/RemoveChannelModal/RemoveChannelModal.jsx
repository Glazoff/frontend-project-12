import { Modal, Button } from 'react-bootstrap';
import { Trans, useTranslation } from 'react-i18next';

export function RemoveChannelModal({ show, handleClose, handleConfirm, channelName, isDeleting }) {
  const { t } = useTranslation();

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.removeChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>
          <Trans
            i18nKey="chat.removeChannelModal.confirmMessage"
            values={{ name: channelName }}
            components={{ strong: <strong /> }}
          />
        </p>
        <p className="text-muted small">
          {t('chat.removeChannelModal.warning')}
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose} disabled={isDeleting}>
          {t('common.buttons.cancel')}
        </Button>
        <Button variant="danger" onClick={handleConfirm} disabled={isDeleting}>
          {isDeleting ? t('common.status.deleting') : t('common.buttons.delete')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
