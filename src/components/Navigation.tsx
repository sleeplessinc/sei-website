import React, { useEffect, useState } from 'react';
import Navbar from 'react-bootstrap/Navbar';
import { Nav } from 'react-bootstrap';
import { HashLink } from 'react-router-hash-link';

interface ScrollState {
  prevScrollpos: number;
  visible: boolean;
}

const Navigation: React.FC = () => {
  const [scrollState, setScrollState] = useState<ScrollState>({
    prevScrollpos: window.pageYOffset,
    visible: true,
  });

  const handleScroll = () => {
    const currentScrollPos = window.pageYOffset;
    setScrollState({
      prevScrollpos: currentScrollPos,
      visible: scrollState.prevScrollpos > currentScrollPos,
    });
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  });

  const isTop = window.pageYOffset === 0;
  const location: 'top' | undefined = isTop ? undefined : 'top';

  return (
    <Navbar bg="dark" variant="dark" fixed={location}>
      <Navbar.Brand as={HashLink} to="/#top" className="montserrat">
        <img
          alt=""
          src={process.env.PUBLIC_URL + '/img/logo_app.webp'}
          width="55"
          height="auto"
          className="d-inline-block align-middle mr-2"
        />
        <div className="d-inline">
          <span className="d-none d-sm-inline-block">Street Epistemology</span>
        </div>
      </Navbar.Brand>
      <Navbar.Collapse className="justify-content-end">
        <Nav>
          <Nav.Link href="https://facebook.com/501c3forSE" target="blank" className="d-inline">
            <img
              src="https://storage.googleapis.com/se-website-fe4a4.appspot.com/images/icons/icon-facebook.svg"
              width="30px"
              height="30px"
            />
          </Nav.Link>
          <Nav.Link href="https://twitter.com/501c3forSE" target="blank" className="d-inline">
            <img
              src="https://storage.googleapis.com/se-website-fe4a4.appspot.com/images/icons/icon-twitter.svg"
              width="30px"
              height="30px"
            />
          </Nav.Link>
        </Nav>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default Navigation;
