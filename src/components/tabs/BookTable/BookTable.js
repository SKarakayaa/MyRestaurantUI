import "react-datetime/css/react-datetime.css";

import * as rezervationActions from "../../../redux/actions/rezervationActions";

import { Button, Col, Form, Row } from "react-bootstrap";
import IsLogin, { CurrentCustomerId, GetCurrentUser } from "../../Helper";
import React, { Component } from "react";

import Datetime from "react-datetime";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "../../history";

class BookTable extends Component {
  constructor() {
    super();

    this.state = {
      full_name: GetCurrentUser().completeName,
      email: "",
      telephone: "",
      rezervation_date: "",
      user_id: GetCurrentUser().userId,
      customer_id: CurrentCustomerId(),
    };
  }
  HandleDate = (event) => {
    this.setState({ rezervation_date: event.toDate().toString() });
  };
  HandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  HandleSubmit = (event) => {
    event.preventDefault();

    this.props.actions.addRezervation(this.state).then((result) => {
      if (result.payload.success === true) {
        alertify.success("Rezervation is created !");
        this.setState({
          email: "",
          telephone: "",
          rezervation_date: "",
        });
      } else {
        alertify.danger("Occurs an error when creating rezervation !");
      }
    });
  };
  render() {
    if (!IsLogin()) {
      history.push("/login");
    }
    return IsLogin() ? (
      <div
        id="book-a-table"
        className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page"
      >
        <h5 className="mb-4">Book A Table</h5>
        <Form onSubmit={this.HandleSubmit}>
          <Row>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  id="full_name"
                  value={this.state.full_name}
                  onChange={this.HandleChange}
                  placeholder="Enter Full Name"
                />
              </Form.Group>
            </Col>
            <Col sm={6}>
              <Form.Group>
                <Form.Label>Email Address</Form.Label>
                <Form.Control
                  name="email"
                  id="email"
                  value={this.state.email}
                  onChange={this.HandleChange}
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
                  id="telephone"
                  value={this.state.telephone}
                  onChange={this.HandleChange}
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
                  value={new Date(this.state.rezervation_date)}
                  onChange={this.HandleDate}
                  inputProps={{ placeholder: "Enter Date and Time" }}
                />
              </Form.Group>
            </Col>
          </Row>
          <Form.Group className="text-right">
            <Button variant="primary" type="submit">
              {" "}
              Submit{" "}
            </Button>
          </Form.Group>
        </Form>
      </div>
    ) : (
      ""
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      addRezervation: bindActionCreators(
        rezervationActions.addRezervationRequest,
        dispatch
      ),
    },
  };
}
export default connect(null, mapDispatchToProps)(BookTable);
