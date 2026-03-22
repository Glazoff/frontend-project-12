import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Container, Row, Col, Card, Form, Button, Alert } from 'react-bootstrap';
import { useFormik } from 'formik';

import { setAuthToken } from '../../api';
import { login } from '../../api/auth';

export function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const formik = useFormik({
    initialValues: {
      name: '',
      password: '',
    },
    onSubmit: async (values, actions) => {
      try {
        const { token, username } = await login(values);
        const userNameToSave = username || values.name;
        localStorage.setItem('token', token);
        localStorage.setItem('username', userNameToSave);
        setAuthToken(token, userNameToSave);
        navigate('/');
      } catch {
        setError('the username or password is incorrect');
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
              <h4 className="mb-0 text-center">Вход</h4>
            </Card.Header>
            <Card.Body>
              {error && (
                <Alert variant="danger" role="alert">
                  {error}
                </Alert>
              )}
              <Form onSubmit={formik.handleSubmit}>
                <Form.Group className="mb-3" controlId="formName">
                  <Form.Label>Имя пользователя</Form.Label>
                  <Form.Control
                    type="text"
                    name="name"
                    placeholder="Введите имя"
                    value={formik.values.name}
                    onChange={formik.handleChange}
                    onBlur={formik.handleBlur}
                    disabled={formik.isSubmitting}
                  />
                </Form.Group>

                <Form.Group className="mb-3" controlId="formPassword">
                  <Form.Label>Пароль</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Введите пароль"
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
                  {formik.isSubmitting ? 'Вход...' : 'Войти'}
                </Button>
              </Form>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}