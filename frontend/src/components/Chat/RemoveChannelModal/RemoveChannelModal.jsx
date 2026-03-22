import { Modal, Button } from 'react-bootstrap';

export function RemoveChannelModal({ show, handleClose, handleConfirm, channelName }) {
  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Удаление канала</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <p>Вы уверены, что хотите удалить канал <strong>{channelName}</strong>?</p>
        <p className="text-muted small">
          Все сообщения этого канала будут удалены, а пользователи перемещены в канал General.
        </p>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button variant="danger" onClick={handleConfirm}>
          Удалить
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
