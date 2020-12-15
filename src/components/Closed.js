import { Col, Container, Image, Row } from "react-bootstrap";

import React from "react";

class Closed extends React.Component {
  render() {
    return (
      <section className="section pt-5 pb-5 osahan-not-found-page">
        <Container>
          <Row>
            <Col md={12} className="text-center pt-5 pb-5">
              <Image className="img-fluid" src="/img/closed.png" alt="404" />
              <h1 className="mt-2 mb-2">Restaurant is closed now !</h1>
              <p>Please try again in morning !</p>
            </Col>
          </Row>
        </Container>
      </section>
    );
  }
}

export default Closed;
