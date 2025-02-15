import { Container, Navbar, Nav, Button } from 'react-bootstrap';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Layout = ({ children }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="dark" variant="dark" expand="lg" className="shadow-sm">
        <Container>
          <Navbar.Brand as={Link} to="/" className="d-flex align-items-center">
            <img
              src="/logo.png"
              alt="Moroccan Traditions"
              height="40"
              className="me-2"
            />
            <span className="h4 mb-0 text-warning">MOROCCAN TRADITIONS</span>
          </Navbar.Brand>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse id="basic-navbar-nav">
            <Nav className="ms-auto">
              <Nav.Link as={Link} to="/products" className="text-light">
                Products
              </Nav.Link>
              <Nav.Link as={Link} to="/riads" className="text-light">
                Riads
              </Nav.Link>
              {user ? (
                <>
                  <Button variant="outline-warning" onClick={logout} className="ms-2">
                    Logout
                  </Button>
                  {user.role === 'admin' && (
                    <Button variant="warning" className="ms-2" onClick={() => navigate('/admin')}>
                      Admin Panel
                    </Button>
                  )}
                </>
              ) : (
                <Button variant="outline-light" className="ms-2" onClick={() => navigate('/login')}>
                  Login
                </Button>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>

      <main className="flex-grow-1 bg-light">{children}</main>

      <footer className="bg-dark text-white py-4 mt-auto">
        <Container>
          <div className="text-center">
            © 2025 MOROCCAN TRADITIONS - Preserving Cultural Heritage
          </div>
        </Container>
      </footer>
    </div>
  );
};

export default Layout;