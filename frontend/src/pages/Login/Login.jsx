import { Link } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { Container, Row, Col, Card, Form, Button } from 'react-bootstrap'
import { useFormik } from 'formik'
import { useTranslation } from 'react-i18next'

import { setAuthToken } from '../../api'
import { login } from '../../api/auth'
import { useToastNotifications } from '../../components/ToastNotification'

export function Login() {
  const { t } = useTranslation()
  const { showToast } = useToastNotifications()
  const navigate = useNavigate()

  const submitForm = async (values, actions) => {
    try {
      const { token, username } = await login(values)
      const userNameToSave = username || values.name
      localStorage.setItem('token', token)
      localStorage.setItem('username', userNameToSave)
      setAuthToken(token, userNameToSave)
      navigate('/')
    }
    catch {
      showToast.error(t('auth.login.errors.invalidCredentials'))
    }
    finally {
      actions.setSubmitting(false)
    }
    }

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: submitForm,
  })

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card shadow="sm">
            <Card.Header className="bg-light">
              <h4 className="mb-0 text-center">{t('auth.login.title')}</h4>
            </Card.Header>
            <Card.Body>
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>{t('auth.login.usernameLabel')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={t('auth.login.usernamePlaceholder')}
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>{t('auth.login.passwordLabel')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('auth.login.passwordPlaceholder')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                  />
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? t('auth.login.submitting') : t('auth.login.submit')}
                </Button>
              </Form>
              <div className="text-center mt-3">
                <span>
                  {t('auth.login.noAccount')}
                  {' '}
                </span>
                <Link to="/signup">{t('auth.login.signupLink')}</Link>
              </div>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
