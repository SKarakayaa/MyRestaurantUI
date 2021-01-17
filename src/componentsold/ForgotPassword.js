import * as userActions from "../redux/actions/userActions";

import { Col, Container, Form, Row } from "react-bootstrap";

import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      email: "",
    };
  }
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    
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
                    <h3 className="login-heading mb-4">Forgot Password!</h3>
                    
                    <br></br>
                    <Form onSubmit={this.handleSubmit}>
                      <div className="form-label-group">
                        <Form.Control
                          type="text"
                          id="email"
                          name="email"
                          value={this.state.email}
                          onChange={this.handleChange}
                          placeholder="Email"
                        />
                        <Form.Label htmlFor="email">Email</Form.Label>
                      </div>
                      <button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        Send
                      </button>
                      
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
