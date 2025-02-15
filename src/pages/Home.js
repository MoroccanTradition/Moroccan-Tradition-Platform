import { Container, Row, Col, Card } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import ProductCard from '../components/ProductCard';

const Home = () => {
  return (
    <div className="position-relative overflow-hidden">
      {/* Hero Section */}
      <div className="bg-image position-relative" 
           style={{ 
             backgroundImage: "url('/moroccan-pattern.jpg')",
             height: '60vh',
             backgroundSize: 'cover',
             backgroundPosition: 'center'
           }}>
        <div className="position-absolute top-50 start-50 translate-middle text-center " bg="dark" variant="dark">
          <h1 className="display-3 text-white mb-4 fw-bold">
            Welcome to <span className="text-warning">Moroccan Tradition</span>
          </h1>
          <Link to="/products" className="btn btn-warning btn-lg">
            Explore Collection
          </Link>
        </div>
      </div>

      {/* Featured Section */}
      <Container className="py-5">
        <h2 className="text-center mb-5 display-4 text-dark">
          LE TITRE D'HOTEL
        </h2>
        
        <Row className="g-4">
          {[1, 2, 3].map((item) => (
            <Col key={item} md={4}>
              <Card className="h-100 shadow-sm border-0">
                <Card.Img 
                  variant="top" 
                  src={`/riad-${item}.jpg`} 
                  style={{ height: '250px', objectFit: 'cover' }}
                />
                <Card.Body className="d-flex flex-column">
                  <Card.Title className="fw-bold text-dark">
                    Traditional Riad Experience
                  </Card.Title>
                  <Card.Text className="text-muted">
                    Experience authentic Moroccan hospitality
                  </Card.Text>
                  <Link 
                    to="/riads" 
                    className="btn btn-outline-dark mt-auto align-self-start"
                  >
                    Voir plus →
                  </Link>
                </Card.Body>
              </Card>
            </Col>
          ))}
        </Row>
      </Container>
    </div>
  );
};

export default Home;