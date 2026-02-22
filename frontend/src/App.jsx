import {BrowserRouter, Routes, Route} from 'react-router-dom';
import {Main} from './pages/Main'
import {Login} from './pages/Login'
import {PageNotFound} from './pages/404';

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<PageNotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
