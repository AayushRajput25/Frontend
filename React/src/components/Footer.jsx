import React from 'react';
import { Link } from 'react-router-dom';
import { Container, Row, Col } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

const Footer = () => {
  return (
    <footer style={{ backgroundColor: '#343a40', color: 'white', marginTop: 'auto', padding: '10px' }}>
      <Container>
        <Row className="mb-1">
          <Col md={6}>
            <div>
              <h5 className="mb-2">E-Learning</h5>
              <p className="mb-1">Empowering minds through online education.</p>
              <p>&copy; {new Date().getFullYear()} E-Learning. All rights reserved.</p>
              <p className="mt-1">
                <Link to="/privacy" className="text-light">Privacy Policy</Link> | <Link to="/terms" className="text-light">Terms of Service</Link>
              </p>
            </div>
          </Col>
          <Col md={3}>
            <div>
              <h5 className="mb-3">Quick Links</h5>
              <ul className="list-unstyled">
                <li><Link to="/" className="text-light">Home</Link></li>
                <li><Link to="/about" className="text-light">About</Link></li>
                <li><Link to="/login" className="text-light">Login</Link></li>
                <li><Link to="/contact" className="text-light">Contact</Link></li>
              </ul>
            </div>
          </Col>
          <Col md={3}>
            <div>
              <h5 className="mb-3">Contact Us</h5>
              <p className="mb-2">Sunbeam Pune</p>
              <p className="mb-2">Email: E-learning@gmail.com</p>
              <p>Phone: +1234567890</p>
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};

export default Footer;
