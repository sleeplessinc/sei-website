import React, { useRef } from 'react';
import { Card, CardDeck, Col, Container, Row } from 'react-bootstrap';
import NewsFeed from './NewsFeed';

interface DonationProvider {
  name: string;
  url: string;
}

const MainPage: React.FC = () => {
  const refForm = useRef<HTMLFormElement>(null);
  const donations: DonationProvider[] = [
    { name: 'Patreon', url: 'https://www.patreon.com/streetepistemologyinternational' },
    { name: 'Amazon Smile', url: 'https://smile.amazon.com/ch/83-4404993' },
    { name: 'SubscribeStar', url: 'https://www.subscribestar.com/street-epistemology-international/subscribe' },
  ];

  const handlePayPalDonation = (event) => {
    event.preventDefault();
    if (refForm?.current) {
      refForm.current.submit();
    }
  };
  const donationCards = donations.map((donation) => {
    return (
      <Card key={donation.name}>
        <Card.Body>
          <a href={donation.url}>
            <Row className="align-items-center text-center" style={{ height: '100%' }}>
              <Col>
                <img
                  className="card-block stretched-link text-decoration-none"
                  style={{ height: '5rem', width: 'auto', maxWidth: '100%' }}
                  src={
                    'https://storage.googleapis.com/se-website-fe4a4.appspot.com/images/icons/icon-' +
                    donation.name.toLowerCase().replace(' ', '') +
                    '.svg'
                  }
                />
                <br />
                <br />
                Donate with {donation.name}®
              </Col>
            </Row>
          </a>
        </Card.Body>
      </Card>
    );
  });
  return (
    <div className="container-fluid p-0">
      <img
        src="https://storage.googleapis.com/se-website-fe4a4.appspot.com/images/banners/sei-banner.webp"
        style={{ width: '100%', height: 'auto' }}
      />
      <Container>
        <h1 className="my-3">Welcome to Street Epistemology International</h1>
        <p>
          Street Epistemology International is a 501(c)(3) non-profit whose mission is to encourage and normalize
          critical thinking and skepticism while providing people around the world with the resources needed to develop
          and promote Street Epistemology.
        </p>
      </Container>
      <hr />
      <NewsFeed />
      <hr />
      <Container>
        <h1 className="mb-3">Donate</h1>
        <p>
          Anyone can make a contribution (tax-deductible for US residents only) to Street Epistemology International
          here:
        </p>
        <form
          ref={refForm}
          action="https://www.paypal.com/donate"
          method="post"
          target="_top"
          style={{ display: 'none' }}
        >
          <input type="hidden" name="hosted_button_id" value="HK78ZF6RX4VWU" />
          <input
            type="image"
            className="card-block stretched-link text-decoration-none"
            style={{ height: '5rem', width: 'auto', maxWidth: '100%' }}
            name="submit"
            alt="Donate with PayPal button"
          />
        </form>
        <CardDeck>
          <Card key="paypal">
            <Card.Body>
              <a onClick={handlePayPalDonation} href="">
                <Row className="align-items-center text-center" style={{ height: '100%' }}>
                  <Col>
                    <img
                      className="card-block stretched-link text-decoration-none"
                      style={{ height: '5rem', width: 'auto', maxWidth: '100%' }}
                      src="https://storage.googleapis.com/se-website-fe4a4.appspot.com/images/icons/icon-paypal.svg"
                    />
                    <br />
                    <br />
                    Donate with PayPal®
                  </Col>
                </Row>
              </a>
            </Card.Body>
          </Card>
          {donationCards}
        </CardDeck>
      </Container>
      <hr />
      <Container>
        <h1 className="mb-3">Purpose</h1>
        <p>
          Street Epistemology International (SEI) is a 501(c)(3) non-profit organization that was officially recognized
          as a tax-exempt entity by the United States Federal Government in May 2019.
        </p>
        <p>
          SEI has been organized to operate exclusively for educational and charitable purposes. More specifically,
          Street Epistemology International was formed to encourage and normalize critical thinking and skepticism while
          providing people around the world with the resources needed to develop and promote Street Epistemology.
        </p>
        <p>
          Our goal is to provide individuals from around the world with the resources needed to introduce, present,
          teach, train, develop, improve, and promote the method while offering fiscal transparency to its donors.
        </p>
        <a href="https://docs.google.com/forms/d/1D4n87RhftLAYuNxMzjPOu4tkgKQM5K4X4n2CC_lp43w/viewform?edit_requested=true">
          Submit a funding consideration request.
        </a>
      </Container>
      <hr />
      <Container>
        <h1 className="mb-3">Organization</h1>
        <p>
          <strong>Founding Executive Director:</strong> Anthony Magnabosco
        </p>
        <p>
          <strong>Founding Board of Directors:</strong> Reid Nicewonder (President), Timothy Dawson (Vice-President)
        </p>
      </Container>
      <hr />
      <Container>
        <h1 className="mb-3">Contact Us</h1>
        <p>
          Contact Us Street Epistemology International 17503 La Cantera Parkway, Suite 104-497 San Antonio, Texas 78257
        </p>
        <p>EIN 83-4404993</p>
        <p>
          <strong>Email:</strong>{' '}
          <a href="mailto:contact@streetepistemologyinternational.org">contact@streetepistemologyinternational.org</a>
        </p>
        <p>
          <strong>Facebook Page:</strong> <a href="https://facebook.com/501c3forSE">https://facebook.com/501c3forSE</a>
        </p>
        <p>
          <strong>Twitter:</strong> <a href="https://twitter.com/501c3forSE">https://twitter.com/501c3forSE</a>
        </p>
      </Container>
    </div>
  );
};

export default MainPage;
