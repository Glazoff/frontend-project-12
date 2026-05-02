import { useState, useRef, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { Modal, Button, Form, Alert } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'
import {addChannelSchema} from '../../utils/yupSchemes'

import { addChannel } from '../../../api/channels'
import { setCurrentChannelId } from '../../../store/channelsSlice'
import { useToastNotifications } from '../../ToastNotification'
import { profanityFilter } from '../../../utils/profanityFilter'

export function AddChannelModal({ show, handleClose }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const { showToast } = useToastNotifications()
  const { items: channels } = useSelector(state => state.channels)
  const [error, setError] = useState('')
  const inputRef = useRef(null)

  useEffect(() => {
    if (show) {
      inputRef.current?.focus()
    }
  }, [show])

  const submitForm = async (values, actions) => {
    try {
      setError('')
      const filteredName = profanityFilter.filter(values.name)
      const newChannel = await addChannel({ name: filteredName })
      dispatch(setCurrentChannelId(newChannel.id))
      handleClose()
      actions.resetForm()
      showToast.success(t('chat.notifications.channelCreated', { name: newChannel.name }))
    }
    catch {
      setError(t('chat.addChannelModal.errors.createError'))
      showToast.error(t('chat.notifications.channelCreateError'))
    }
    finally {
      actions.setSubmitting(false)
    }
  }

  const formik = useFormik({
    initialValues: {
      name: '',
    },
    validationSchema: addChannelSchema(t, channels),
    validateOnChange: false,
    onSubmit: submitForm
  })

  return (
    <Modal show={show} onHide={handleClose}>
      <Modal.Header closeButton>
        <Modal.Title>{t('chat.addChannelModal.title')}</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <Alert variant="danger">{error}</Alert>}
        <Form onSubmit={formik.handleSubmit}>
          <Form.Group className="mb-3" controlId="channelName">
            <Form.Label>{t('chat.addChannelModal.nameLabel')}</Form.Label>
            <Form.Control
              ref={inputRef}
              type="text"
              name="name"
              placeholder={t('chat.addChannelModal.namePlaceholder')}
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
          {t('common.buttons.cancel')}
        </Button>
        <Button
          variant="primary"
          onClick={formik.handleSubmit}
          disabled={formik.isSubmitting}
        >
          {formik.isSubmitting ? t('common.status.creating') : t('common.buttons.create')}
        </Button>
      </Modal.Footer>
    </Modal>
  )
}
