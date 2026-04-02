import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { useRollbarPerson } from '@rollbar/react';

import { setAuthToken } from '../../api';
import { AUTH_USERNAME_KEY } from '../../constants';

export function Layout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const username = localStorage.getItem(AUTH_USERNAME_KEY);

  useRollbarPerson(username ? { username } : null);

  const handleLogout = () => {
    setAuthToken(null, null);
    navigate('/login');
  };

  return (
    <>
      <Navbar bg="light" variant="light">
        <Container>
          <Nav>
            <Nav.Link as={Link} to="/">{t('common.nav.appName')}</Nav.Link>
          </Nav>
          <Nav>
            <Button variant="outline-secondary" onClick={handleLogout}>
              {t('common.nav.logout')}
            </Button>
          </Nav>
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
