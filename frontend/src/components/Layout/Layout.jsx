import { useState } from 'react';
import { Navbar, Container, Nav, Button } from 'react-bootstrap';
import { Link, Outlet, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';

import { setAuthToken } from '../../api';

export function Layout() {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const [isLoggedIn] = useState(() => !!localStorage.getItem('token'));

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
          {isLoggedIn && (
            <Nav>
              <Button variant="outline-secondary" onClick={handleLogout}>
                {t('common.nav.logout')}
              </Button>
            </Nav>
          )}
        </Container>
      </Navbar>
      <Outlet />
    </>
  );
}
