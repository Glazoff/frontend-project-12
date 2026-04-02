import { useState, useRef, useEffect } from 'react';
import { useSelector } from 'react-redux';
import { Modal, Button, Form, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { profanityFilter } from '../../../utils/profanityFilter';

export function RenameChannelModal({ show, handleClose, handleConfirm, channel, isRenaming }) {
  const { t } = useTranslation();
  const { items: channels } = useSelector((state) => state.channels);
  const [error, setError] = useState('');
  const inputRef = useRef(null);

  useEffect(() => {
    if (show) {
      inputRef.current?.focus();
    }
  }, [show]);

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('chat.renameChannelModal.errors.nameRequired'))
      .min(3, t('chat.renameChannelModal.errors.nameMinLength'))
      .max(20, t('chat.renameChannelModal.errors.nameMaxLength'))
      .test(
        'is-unique',
        t('chat.renameChannelModal.errors.nameExists'),
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
        const filteredName = profanityFilter.filter(values.name);
        await handleConfirm(filteredName);
        handleClose();
        actions.resetForm();
      } catch {
        setError(t('chat.renameChannelModal.errors.renameError'));
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.renameChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="channelName">
            <Form.Label>{t('chat.renameChannelModal.nameLabel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              name="name"
              placeholder={t('chat.renameChannelModal.namePlaceholder')}
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
        <Button variant="secondary" onClick={handleClose} disabled={isRenaming}>
          {t('common.buttons.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting || isRenaming}
        >
          {formik.isSubmitting || isRenaming ? t('common.status.saving') : t('common.buttons.save')}
        </Button>
      </Modal.Footer>
    </Modal>
  );
}
