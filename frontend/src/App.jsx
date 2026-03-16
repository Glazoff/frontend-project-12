import { BrowserRouter, Route, Routes } from 'react-router-dom';

import { ProtectedRoute } from './components/ProtectedRoute';
import { Login } from './pages/Login';
import { Main } from './pages/Main';
import { PageNotFound } from './pages/404';

export const App = () => (
  <BrowserRouter>
    <Routes>
      <Route element={<ProtectedRoute />} path="/">
        <Route element={<Main />} index />
      </Route>
      <Route element={<Login />} path="/login" />
      <Route element={<PageNotFound />} path="*" />
    </Routes>
  </BrowserRouter>
);

export default App;
