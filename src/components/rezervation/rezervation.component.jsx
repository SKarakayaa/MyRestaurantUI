import "react-datetime/css/react-datetime.css";

import { Button, Col, Form, Row } from "react-bootstrap";

import AuthHelper from "../../helpers/authHelper";
import Datetime from "react-datetime";
import React from "react";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { fetchCreateRezervationAsync } from "../../redux/customer/customer.actions";

class Rezervation extends React.Component {
  state = {
    full_name: "",
    email: "",
    telephone: "",
    user_id: AuthHelper.GetCurrentUser().userId,
    rezervation_date: "",
  };
  handleDate = (event) => {
    this.setState({ rezervation_date: event.toDate().toString() });
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.createRezervation(this.state);
    alertify.success("Rezervation is created !");
    this.setState({
      email: "",
      telephone: "",
      rezervation_date: "",
      full_name: "",
    });
  };
  render() {
    const { full_name, email, telephone, rezervation_date } = this.state;
    return (
      <div
        id="book-a-table"
        className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
      >
        <h5 className="mb-4">Book A Table</h5>
        <Form onSubmit={this.handleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  value={full_name}
                  onChange={this.handleChange}
                  placeholder="Enter Full Name"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  value={email}
                  onChange={this.handleChange}
                  required
                  type="text"
                  placeholder="Enter Email address"
                />
              </Form.Group>
            </Col>
          </Row>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Mobile number</Form.Label>
                <Form.Control
                  name="telephone"
                  value={telephone}
                  onChange={this.handleChange}
                  type="phone"
                  placeholder="Enter Mobile number"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Date And Time</Form.Label>
                <Datetime
                  name="rezervation_date"
                  id="rezervation_date"
                  value={new Date(rezervation_date)}
                  onChange={this.handleDate}
                  inputProps={{ placeholder: "Enter Date and Time" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="text-right">
            <Button variant="primary" type="submit">
              Submit
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
const mapDispatchToProps = (dispatch) => ({
  createRezervation: (rezervation) =>
    dispatch(fetchCreateRezervationAsync(rezervation)),
});
export default connect(null, mapDispatchToProps)(Rezervation);
