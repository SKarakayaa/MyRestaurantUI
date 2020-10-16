import React from "react";
import { Link } from "react-router-dom";
import { Row, Col, Container, Form, Button } from "react-bootstrap";
import { bindActionCreators } from "redux";
import * as userActions from "../redux/actions/userActions";
import { connect } from "react-redux";

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      full_name: "",
      email: "",
      user_name: "",
      pass_word: "",
      profile_picture_id: 1,
    };
    this.handleChange = (event) => {
      const { name, value } = event.target;
      this.setState({ [name]: value });
    };
    this.handleSave = (event) => {
      event.preventDefault();
      // let user = {
      //   full_name: this.state.full_name,
      //   email: this.state.email,
      //   user_name: this.state.user_name,
      //   password: this.state.pass_word,
      //   profile_picture_id: this.state.profile_picture_id,
      // };
      this.props.actions.register(this.state);
    };
  }

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
                          onChange={this.handleChange.bind(this)}
                          placeholder="Email address"
                        />
                        <Form.Label htmlFor="email">
                          Email address / Mobile
                        </Form.Label>
                      </div>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="user_name"
                          name="user_name"
                          value={this.state.user_name}
                          onChange={this.handleChange.bind(this)}
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
                          onChange={this.handleChange.bind(this)}
                          placeholder="Password"
                        />
                        <Form.Label htmlFor="pass_word">Password</Form.Label>
                      </div>
                      {/* <Button className=""></Button> */}
                      <Button
                        // to={Button}
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Sign Up
                      </Button>
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

function mapStateToProps(state) {
  return {
    currentUser: state.currentUserReducer,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: {
      register: bindActionCreators(userActions.register, dispatch),
    },
  };
}

export default connect(mapStateToProps, mapDispatchToProps)(Register);
