import { Button, Form, Modal } from "react-bootstrap";

import React from "react";
import Translate from "../../utilities/translator";
import UserActionTypes from "../../redux/user/user.types";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchUserInfoUpdateAsync } from "../../redux/user/user.actions";
import { selectUserInfoUpdateErrorMessage } from "../../redux/user/user.reselect";

class EditProfileModal extends React.Component {
  state = {
    tuser_id: this.props.userInfo.user_id,
    full_name: this.props.userInfo.full_name,
    phone: this.props.userInfo.phone,
    email: this.props.userInfo.email,
    profile_picture_id: 1,
  };
  HandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  HandleSubmit = (event) => {
    event.preventDefault();
    const { editProfile } = this.props;
    editProfile(this.state).then((result) => {
      if (result.type === UserActionTypes.EDIT_PROFILE_SUCCESS) {
        alertify.success("User informations are updated !");
        this.props.onHide();
      }
    });
  };
  render() {
    const { show, onHide, errorMessage } = this.props;
    const { full_name, phone, email } = this.state;
    return (
      <Modal show={show} onHide={onHide} size="sm" centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            <Translate>Edit profile</Translate>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            <span className="mb-4 text-danger">{errorMessage}</span>
            <div className="form-row">
              <Form.Group className="col-md-12">
                <Form.Label>
                  <Translate>Full Name</Translate>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  id="full_name"
                  onChange={this.HandleChange}
                  value={full_name}
                  placeholder="Enter Your Full Name"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>
                  <Translate>Phone number</Translate>
                </Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={this.HandleChange}
                  value={phone}
                  placeholder="Enter Phone number"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="email"
                  name="email"
                  id="email"
                  onChange={this.HandleChange}
                  value={email}
                  placeholder="Enter Email"
                />
              </Form.Group>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
              onClick={onHide}
              variant="outline-primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              <Translate>CANCEL</Translate>
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              <Translate>UPDATE</Translate>
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  errorMessage: selectUserInfoUpdateErrorMessage,
});
const mapDispatchToProps = (dispatch) => ({
  editProfile: (userInfo) => dispatch(fetchUserInfoUpdateAsync(userInfo)),
});
export default connect(mapStateToProps, mapDispatchToProps)(EditProfileModal);
