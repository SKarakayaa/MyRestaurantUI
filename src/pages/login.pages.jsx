import { Button, Col, Container, Form, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import {
  selectLoginCompleted,
  selectLoginError,
} from "../redux/auth/auth.reselect";

import FontAwesome from "../componentsold/common/FontAwesome";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { login } from "../redux/auth/auth.actions";

class Login extends React.Component {
  state = {
    userName: "",
    passWord: "",
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { login } = this.props;
    login(this.state);
    // this.props.actions.login(this.state).then((result) => {
    //   if (result.type === actionTypes.LOGIN_ERROR) {
    //     this.setState({ loginError: result.payload.error });
    //   } else {
    //     history.push("/");
    //   }
    // });
  };
  render() {
    const { userName, passWord } = this.state;
    const { loginCompleted, loginError } = this.props;
    return loginCompleted ? (
      <Redirect to="/" />
    ) : (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4">Welcome back!</h3>
                    <span className="mb-4 text-danger">{loginError}</span>
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="userName"
                          name="userName"
                          value={userName}
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
                          value={passWord}
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
                        &emsp;
                        <Link
                          className="font-weight-bold"
                          to="/forgot-password"
                        >
                          Forgot Password ?
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
const mapStateToProps = createStructuredSelector({
  loginCompleted: selectLoginCompleted,
  loginError: selectLoginError,
});
const mapDispatchToProps = (dispatch) => ({
  login: (loginModel) => dispatch(login(loginModel)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
