import { Container, Row, Col, Card } from 'react-bootstrap';

export function PageNotFound() {
  return (
    <Container className="h-100">
      <Row className="h-100 align-items-center justify-content-center">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="text-center" shadow="sm">
            <Card.Body>
              <h1 className="display-1 text-muted">404</h1>
              <h3 className="mb-3">Страница не найдена</h3>
              <p className="text-muted">
                Страница, которую вы ищете, не существует или была перемещена.
              </p>
              <a href="/" className="btn btn-primary">
                На главную
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  );
}