import { Button, Col, Spinner } from "react-bootstrap";

import React from "react";

const Loading = () => (
  <Col md={12} className="text-center load-more">
    <Button variant="primary" type="button" disabled="">
      <Spinner animation="grow" size="sm" className="mr-1" />
      Loading...
    </Button>
  </Col>
);
export default Loading;
