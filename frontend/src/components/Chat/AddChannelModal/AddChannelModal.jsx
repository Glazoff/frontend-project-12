import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';

import { addChannel } from '../../../api/channels';
import { setCurrentChannelId } from '../../../store/channelsSlice';

export function AddChannelModal({ show, handleClose }) {
  const dispatch = useDispatch();
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
          if (!value) return true;
          return !channels.some(
            (ch) => ch.name.toLowerCase() === value.toLowerCase()
          );
        }
      ),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema,
    validateOnChange: false,
    onSubmit: async (values, actions) => {
      try {
        setError('');
        const newChannel = await addChannel({ name: values.name });
        dispatch(setCurrentChannelId(newChannel.id));
        handleClose();
        actions.resetForm();
      } catch {
        setError('Ошибка при создании канала');
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>Новый канал</Modal.Title>
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
          {formik.isSubmitting ? 'Создание...' : 'Создать'}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
