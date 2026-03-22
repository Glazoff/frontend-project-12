import { useState } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

export function RenameChannelModal({ show, handleClose, handleConfirm, channel }) {
  const { items: channels } = useSelector((state) => state.channels);
  const [error, setError] = useState('');

  const validationSchema = yup.object({
    name: yup
      .string()
      .required('Название канала обязательно')
      .min(3, 'Минимум 3 символа')
      .max(20, 'Максимум 20 символов')
      .test(
        'is-unique',
        'Канал с таким именем уже существует',
        (value) => {
          if (!value || !channel || !channels) return true;
          return !channels.some(
            (ch) =>
              ch.id !== channel.id &&
              ch.name.toLowerCase() === value.toLowerCase()
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: channel?.name || '',
    },
    validationSchema,
    validateOnChange: false,
    enableReinitialize: true,
    onSubmit: async (values, actions) => {
      try {
        setError('');
        await handleConfirm(values.name);
        handleClose();
        actions.resetForm();
      } catch {
        setError('Ошибка при переименовании канала');
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Переименовать канал</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="channelName">
            <Form.Label>Название канала</Form.Label>
            <Form.Control
              type="text"
              name="name"
              placeholder="Введите название"
              value={formik.values.name}
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              isInvalid={formik.touched.name && !!formik.errors.name}
              disabled={formik.isSubmitting}
            />
            <Form.Control.Feedback type="invalid">
              {formik.errors.name}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleClose}>
          Отмена
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? 'Сохранение...' : 'Сохранить'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
