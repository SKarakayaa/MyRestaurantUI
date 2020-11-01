import { Button, Col, Form, Row } from "react-bootstrap";
import React, { Component } from "react";

class BookTable extends Component {
  render() {
    return (
      <div
        id="book-a-table"
        className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
      >
        <h5 className="mb-4">Book A Table</h5>
        <Form>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control type="text" placeholder="Enter Full Name" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control type="text" placeholder="Enter Email address" />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Mobile number</Form.Label>
                <Form.Control type="text" placeholder="Enter Mobile number" />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Date And Time</Form.Label>
                <Form.Control type="text" placeholder="Enter Date And Time" />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="text-right">
            <Button variant="primary" type="button">
              {" "}
              Submit{" "}
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
export default BookTable;
