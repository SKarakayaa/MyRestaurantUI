import { Col, Container, Form, Row } from "react-bootstrap";
import { Link, Redirect } from "react-router-dom";
import {
  selectRegisterCompleted,
  selectRegisterError,
} from "../redux/auth/auth.reselect";

import FormInput from "../components/inputs/form-input.component";
import React from "react";
import Translate from '../utilities/translator';
import {TranslatePlaceholder} from '../utilities/translator-placeholder';
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { register } from "../redux/auth/auth.actions";

class Register extends React.Component {
  state = {
    full_name: "",
    email: "",
    phone: "",
    user_name: "",
    pass_word: "",
    profile_picture_id: 1,
  };
  handleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  handleSubmit = (event) => {
    event.preventDefault();
    const { register } = this.props;
    register(this.state);
  };
  render() {
    const { full_name, email, phone, user_name, pass_word } = this.state;
    const { registerError, registerCompleted } = this.props;
    return registerCompleted ? (
      <Redirect to="/login" />
    ) : (
      <Container fluid className="bg-white">
        <Row>
          <Col md={4} lg={6} className="d-none d-md-flex bg-image"></Col>
          <Col md={8} lg={6}>
            <div className="login d-flex align-items-center py-5">
              <Container>
                <Row>
                  <Col md={9} lg={8} className="mx-auto pl-5 pr-5">
                    <h3 className="login-heading mb-4"><Translate>New Buddy!</Translate></h3>
                    <span className="mb-4 text-danger">{registerError}</span>
                    <Form onSubmit={this.handleSubmit}>
                      <FormInput
                        handleChange={this.handleChange}
                        labelText={TranslatePlaceholder("Full name")}
                        name="full_name"
                        placeholder={TranslatePlaceholder("Full name")}
                        type="text"
                        value={full_name}
                      />
                      <FormInput
                        handleChange={this.handleChange}
                        labelText={TranslatePlaceholder("Email")}
                        name="email"
                        placeholder={TranslatePlaceholder("Email")}
                        type="email"
                        value={email}
                      />
                      <FormInput
                        handleChange={this.handleChange}
                        labelText={TranslatePlaceholder("Phone number")}
                        name="phone"
                        placeholder={TranslatePlaceholder("Phone number")}
                        type="number"
                        value={phone}
                      />
                      <FormInput
                        handleChange={this.handleChange}
                        labelText={TranslatePlaceholder("Username")}
                        name="user_name"
                        placeholder={TranslatePlaceholder("Username")}
                        type="text"
                        value={user_name}
                      />
                      <FormInput
                        handleChange={this.handleChange}
                        labelText={TranslatePlaceholder("Password")}
                        name="pass_word"
                        placeholder={TranslatePlaceholder("Password")}
                        type="password"
                        value={pass_word}
                      />
                      <button
                        type="submit"
                        className="btn btn-lg btn-outline-primary btn-block btn-login text-uppercase font-weight-bold mb-2"
                      >
                        <Translate>Sign Up</Translate>
                      </button>
                      <div className="text-center pt-3">
                        <Translate>Already have an account?</Translate>{" "}
                        <Link className="font-weight-bold" to="/login">
                          <Translate>Sign In</Translate>
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
const mapStateToProps = createStructuredSelector({
  registerCompleted: selectRegisterCompleted,
  registerError: selectRegisterError,
});
const mapDispatchToProps = (dispatch) => ({
  register: (registerModel) => dispatch(register(registerModel)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Register);
