import * as actionTypes from "../redux/actions/actionTypes";
import * as userActions from "../redux/actions/userActions";

import { Col, Container, Form, Row } from "react-bootstrap";

import { Link } from "react-router-dom";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "./history";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      user_name: "",
      pass_word: "",
      profile_picture_id: 1,
      phone:"",
      registerError: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ registerError: "" });
    this.setState({ [name]: value });
  };
  handleSave = (event) => {
    event.preventDefault();
    this.props.actions.register(this.state).then((result) => {
      if (result.type === actionTypes.REGISTER_SUCCESS) {
        history.push("/login");
      } else {
        this.setState({ registerError: result.payload.error });
      }
    });
  };
  render() {
    return (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4">New Buddy!</h3>
                    <span className="mb-4 text-danger">
                      {this.state.registerError}
                    </span>
                    <Form onSubmit={this.handleSave}>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="full_name"
                          name="full_name"
                          value={this.state.full_name}
                          onChange={this.handleChange}
                          placeholder="Your Fullname"
                        />
                        <Form.Label htmlFor="full_name">
                          Your Fullname
                        </Form.Label>
                      </div>

                      <div className="form-label-group">
                        <Form.Control
                          type="email"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Email address"
                        />
                        <Form.Label htmlFor="email">
                          Email address
                        </Form.Label>
                      </div>

                      <div className="form-label-group">
                        <Form.Control
                          type="number"
                          id="phone"
                          name="phone"
                          value={this.state.phone}
                          onChange={this.handleChange}
                          placeholder="Phone Number"
                          required
                        />
                        <Form.Label htmlFor="email">
                          Phone Number
                        </Form.Label>
                      </div>

                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="user_name"
                          name="user_name"
                          value={this.state.user_name}
                          onChange={this.handleChange}
                          placeholder="Username"
                        />
                        <Form.Label htmlFor="user_name">Username</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="password"
                          id="pass_word"
                          name="pass_word"
                          value={this.state.pass_word}
                          onChange={this.handleChange}
                          placeholder="Password"
                        />
                        <Form.Label htmlFor="pass_word">Password</Form.Label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign Up
                      </button>
                      <div className="text-center pt-3">
                        Already have an account?{" "}
                        <Link className="font-weight-bold" to="/login">
                          Sign In
                        </Link>
                      </div>
                    </Form>
                  </Col>
                </Row>
              </Container>
            </div>
          </Col>
        </Row>
      </Container>
    );
  }
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      register: bindActionCreators(userActions.registerRequest, dispatch),
    },
  };
}

export default connect(null, mapDispatchToProps)(Register);