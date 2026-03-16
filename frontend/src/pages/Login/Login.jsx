import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Alert } from 'react-bootstrap';
import { Field, Form, Formik } from 'formik';

import { setAuthToken } from '../../api';
import { login } from '../../api/auth';

const INITIAL_VALUES = { name: '', password: '' };

export function Login() {
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (values, actions) => {
    try {
      const { token } = await login(values);
      localStorage.setItem('token', token);
      setAuthToken(token);
      navigate('/');
    } catch {
      setError('the username or password is incorrect');
    } finally {
      actions.setSubmitting(false);
    }
  };

  return (
    <Formik initialValues={INITIAL_VALUES} onSubmit={handleSubmit}>
      <Form>
        {error && (
          <Alert role="alert" variant="danger">
            {error}
          </Alert>
        )}
        <label htmlFor="name">Name</label>
        <Field name="name" type="text" />

        <label htmlFor="password">Password</label>
        <Field name="password" type="password" />

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  );
}