import { Card, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const ProductCard = ({ product }) => {
  return (
    <Card className="h-100 shadow-sm border-0">
      <Card.Img 
        variant="top" 
        src={product.imageUrl || '/placeholder-product.jpg'} 
        style={{ height: '200px', objectFit: 'cover' }}
      />
      <Card.Body className="d-flex flex-column">
        <Card.Title className="fw-bold text-dark">{product.name}</Card.Title>
        <Card.Text className="text-muted">{product.description}</Card.Text>
        <div className="mt-auto d-flex justify-content-between align-items-center">
          <h5 className="text-warning mb-0">${product.price}</h5>
          <Button 
            as={Link} 
            to={`/products/${product.id}`} 
            variant="dark"
          >
            View Details
          </Button>
        </div>
      </Card.Body>
    </Card>
  );
};

export default ProductCard;