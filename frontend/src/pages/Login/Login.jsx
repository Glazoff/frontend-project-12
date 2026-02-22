import { Formik, Field, Form } from 'formik';

const initialValues = { name: "", password: "" }

export function Login() {

  return(
    <Formik initialValues={initialValues}>
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