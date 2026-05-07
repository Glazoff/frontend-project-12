import { Container, Row, Col, Card } from 'react-bootstrap'
import { useTranslation } from 'react-i18next'

export function PageNotFound() {
  const { t } = useTranslation()

  return (
    <Container fluid className="h-100">
      <Row className="align-items-center justify-content-center h-100">
        <Col xs={12} sm={8} md={6} lg={4}>
          <Card className="text-center" shadow="sm">
            <Card.Body>
              <h1 className="display-1 text-muted">{t('pages.notFound.code')}</h1>
              <h3 className="mb-3">{t('pages.notFound.title')}</h3>
              <p className="text-muted">
                {t('pages.notFound.message')}
              </p>
              <a href="/" className="btn btn-primary">
                {t('pages.notFound.goHome')}
              </a>
            </Card.Body>
          </Card>
        </Col>
      </Row>
    </Container>
  )
}
