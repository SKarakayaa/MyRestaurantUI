import * as actionTypes from "../redux/actions/actionTypes";
import * as userActions from "../redux/actions/userActions";

import { Button, Col, Container, Form, Row } from "react-bootstrap";

import FontAwesome from "./common/FontAwesome";
import { Link } from "react-router-dom";
import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import history from "./history";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      userName: "",
      passWord: "",
      loginError: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ loginError: "" });
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.login(this.state).then((result) => {
      if (result.type === actionTypes.LOGIN_ERROR) {
        this.setState({ loginError: result.payload.error });
      } else {
        history.push("/");
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
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <span className="mb-4 text-danger">
                      {this.state.loginError}
                    </span>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="userName"
                          name="userName"
                          value={this.state.userName}
                          onChange={this.handleChange}
                          placeholder="Username"
                        />
                        <Form.Label htmlFor="userName">Username</Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="password"
                          id="passWord"
                          name="passWord"
                          value={this.state.passWord}
                          onChange={this.handleChange}
                          placeholder="Password"
                        />
                        <Form.Label htmlFor="passWord">Password</Form.Label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign in
                      </button>
                      <div className="text-center pt-3">
                        Don’t have an account?{" "}
                        <Link className="font-weight-bold" to="/register">
                          Sign Up
                        </Link>
                      </div>
                      <hr className="my-4" />
                      <p className="text-center">LOGIN WITH</p>
                      <div className="row">
                        <div className="col pr-2">
                          <Button
                            className="btn pl-1 pr-1 btn-lg btn-google font-weight-normal text-white btn-block text-uppercase"
                            type="submit"
                          >
                            <FontAwesome icon="google" className="mr-2" />{" "}
                            Google
                          </Button>
                        </div>
                        <div className="col pl-2">
                          <Button
                            className="btn pl-1 pr-1 btn-lg btn-facebook font-weight-normal text-white btn-block text-uppercase"
                            type="submit"
                          >
                            <FontAwesome icon="facebook" className="mr-2" />{" "}
                            Facebook
                          </Button>
                        </div>
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
      login: bindActionCreators(userActions.loginRequest, dispatch),
    },
  };
}
export default connect(null, mapDispatchToProps)(Login);
