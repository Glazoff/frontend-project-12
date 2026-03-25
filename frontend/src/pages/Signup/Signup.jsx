import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';
import * as yup from 'yup';
import { useTranslation } from 'react-i18next';

import { setAuthToken } from '../../api';
import { signup } from '../../api/auth';

export function Signup() {
  const { t } = useTranslation();
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const validationSchema = yup.object({
    name: yup
      .string()
      .required(t('auth.signup.errors.nameRequired'))
      .min(3, t('auth.signup.errors.nameMinLength'))
      .max(20, t('auth.signup.errors.nameMaxLength')),
    password: yup
      .string()
      .required(t('auth.signup.errors.passwordRequired'))
      .min(6, t('auth.signup.errors.passwordMinLength')),
    confirmPassword: yup
      .string()
      .required(t('auth.signup.errors.confirmPasswordRequired'))
      .oneOf([yup.ref('password'), null], t('common.validation.passwordsMatch')),
  });

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
      confirmPassword: '',
    },
    validationSchema,
    onSubmit: async (values, actions) => {
      try {
        const { token, username } = await signup(values);
        const userNameToSave = username || values.name;
        localStorage.setItem('token', token);
        localStorage.setItem('username', userNameToSave);
        setAuthToken(token, userNameToSave);
        navigate('/');
      } catch (err) {
        setError(err.message || t('auth.signup.errors.generic'));
      } finally {
        actions.setSubmitting(false);
      }
    },
  });

  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card shadow="sm">
            <Card.Header className="bg-light">
              <h4 className="mb-0 text-center">{t('auth.signup.title')}</h4>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" role="alert">
                  {error}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>{t('auth.signup.usernameLabel')}</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder={t('auth.signup.usernamePlaceholder')}
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

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>{t('auth.signup.passwordLabel')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder={t('auth.signup.passwordPlaceholder')}
                    value={formik.values.password}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.password && !!formik.errors.password}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.password}
                  </Form.Control.Feedback>
                </Form.Group>

                <Form.Group className="mb-3" controlId="formConfirmPassword">
                  <Form.Label>{t('auth.signup.confirmPasswordLabel')}</Form.Label>
                  <Form.Control
                    type="password"
                    name="confirmPassword"
                    placeholder={t('auth.signup.confirmPasswordPlaceholder')}
                    value={formik.values.confirmPassword}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    isInvalid={formik.touched.confirmPassword && !!formik.errors.confirmPassword}
                    disabled={formik.isSubmitting}
                  />
                  <Form.Control.Feedback type="invalid">
                    {formik.errors.confirmPassword}
                  </Form.Control.Feedback>
                </Form.Group>

                <Button
                  variant="primary"
                  type="submit"
                  className="w-100"
                  disabled={formik.isSubmitting}
                >
                  {formik.isSubmitting ? t('auth.signup.submitting') : t('auth.signup.submit')}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}
