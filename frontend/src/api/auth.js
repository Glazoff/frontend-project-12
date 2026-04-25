import Rollbar from 'rollbar'
import api from './index'

const rollbar = new Rollbar({
  accessToken: import.meta.env.VITE_ROLLBAR_ACCESS_TOKEN,
  environment: import.meta.env.VITE_ROLLBAR_ENVIRONMENT || 'development',
  captureUncaught: true,
  captureUnhandledRejections: true,
})

export const login = ({ name, password }) =>
  api.post('/login', { username: name, password })
    .then(response => response.data)
    .catch((error) => {
      rollbar.error('Login failed', error, { username: name })
      throw error
    })

export const signup = ({ name, password }) =>
  api.post('/signup', { username: name, password })
    .then(response => response.data)
    .catch((error) => {
      rollbar.error('Signup failed', error, { username: name })
      if (error.response?.status === 409) {
        throw new Error('Такой пользователь уже существует')
      }
      throw error
    })
