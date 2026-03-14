import { Formik, Field, Form } from 'formik';
import {login} from '../../api/auth'

const initialValues = { name: "", password: "" }

export function Login() {

  const onSubmit = (values, actions) => {
    login(values)
      .then(({token}) => {
        localStorage.setItem('token', token)
        
        
      })
      .catch((e) => console.error(e))
      .finally(() => {actions.setSubmitting(false)})
  }

  return(
    <Formik initialValues={initialValues} onSubmit={onSubmit}>
      <Form>
        <label htmlFor="name">Name</label>
        <Field type="name" name="name"></Field>

        <label htmlFor="password">Password</label>
        <Field type="password" name="password"></Field>

        <button type="submit">Submit</button>
      </Form>
    </Formik>
  )
}