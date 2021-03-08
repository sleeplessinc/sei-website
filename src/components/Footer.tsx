import React from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Container } from 'react-bootstrap';

const Footer: React.FC = () => {
  return (
    <Navbar bg="dark" variant="dark" expand="lg" className="footer text-right text-light">
      <Container>
        <small style={{ width: '100%' }}>
          © Street Epistemology International
          <br />
          All Rights Reserved
          <br />
          <br />
          Street Epistemology International
          <br />
          17503 La Cantera Parkway, Suite 104-497
          <br />
          San Antonio, Texas 78257
          <br />
          EIN 83-4404993
        </small>
      </Container>
    </Navbar>
  );
};

export default Footer;
