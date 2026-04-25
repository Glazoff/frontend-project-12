import { BrowserRouter, Route, Routes } from 'react-router-dom'
import { RollbarContext } from '@rollbar/react'

import { ProtectedRoute } from './components/ProtectedRoute'
import { Layout } from './components/Layout'
import { Login } from './pages/Login'
import { Signup } from './pages/Signup'
import { Main } from './pages/Main'
import { PageNotFound } from './pages/404'

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<Layout />}>
        <Route element={<ProtectedRoute />} path="/">
          <Route
            element={(
              <RollbarContext context="chat">
                <Main />
              </RollbarContext>
            )}
            index
          />
        </Route>
        <Route
          element={(
            <RollbarContext context="login">
              <Login />
            </RollbarContext>
          )}
          path="/login"
        />
        <Route
          element={(
            <RollbarContext context="signup">
              <Signup />
            </RollbarContext>
          )}
          path="/signup"
        />
        <Route
          element={(
            <RollbarContext context="404">
              <PageNotFound />
            </RollbarContext>
          )}
          path="*"
        />
      </Route>
    </Routes>
  </BrowserRouter>
)

export default App
