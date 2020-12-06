import * as userActions from "../../redux/actions/userActions";

import { Button, Form, Modal } from "react-bootstrap";

import React from "react";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class EditProfileModal extends React.Component {
  constructor(props, context) {
    super(props, context);
    this.state = {
      full_name: "",
      email: "",
      phone: "",
      photo: 1,
      profile_picture_id: 1,
      errorMsg: "",
    };
  }
  componentDidMount() {
    const { userInfo } = this.props;
    this.setState({ email: userInfo.email });
    this.setState({ phone: userInfo.phone });
    this.setState({ full_name: userInfo.full_name });
  }
  HandleChange = (event) => {
    const { name, value } = event.target;
    this.setState({ [name]: value });
  };
  HandleSubmit = (event) => {
    event.preventDefault();
    let updateUserModel = {
      tuser_id: this.props.userInfo.user_id,
      full_name: this.state.full_name,
      email: this.state.email,
      phone: this.state.phone,
      photo: this.state.photo,
      profile_picture_id: this.state.profile_picture_id,
    };
    this.props.actions.updateUser(updateUserModel).then((result) => {
      if (result.payload !== undefined && result.payload.success === false) {
        let errmsg = "";
        result.payload.errors.forEach((error) => {
          errmsg += error.dsc + " " + error.msg;
        });
        this.setState({ errorMsg: errmsg });
      } else {
        alertify.success("User informations are updated !");
        this.props.onHide();
      }
    });

    // console.log("update user result :", result);
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="sm"
        centered
      >
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            Edit profile
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            <span className="mb-4 text-danger">{this.state.errorMsg}</span>
            <div className="form-row">
              <Form.Group className="col-md-12">
                <Form.Label>Full Name</Form.Label>
                <Form.Control
                  type="text"
                  name="full_name"
                  id="full_name"
                  onChange={this.HandleChange}
                  value={this.state.full_name}
                  // defaultValue="+91 85680-79956"
                  placeholder="Enter Your Full Name"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="text"
                  name="phone"
                  id="phone"
                  onChange={this.HandleChange}
                  value={this.state.phone}
                  // defaultValue="+91 85680-79956"
                  placeholder="Enter Phone number"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Email</Form.Label>
                <Form.Control
                  type="text"
                  name="email"
                  id="email"
                  onChange={this.HandleChange}
                  value={this.state.email}
                  // defaultValue="iamosahan@gmail.com"
                  placeholder="Enter Email"
                />
              </Form.Group>
              {/* <Form.Group className="col-md-12 mb-0">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue="**********"
                  placeholder="Enter password
                        "
                />
              </Form.Group> */}
            </div>
          </Modal.Body>

          <Modal.Footer>
            <Button
              type="button"
              onClick={this.props.onHide}
              variant="outline-primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              CANCEL
            </Button>
            <Button
              type="submit"
              variant="primary"
              className="d-flex w-50 text-center justify-content-center"
            >
              UPDATE
            </Button>
          </Modal.Footer>
        </Form>
      </Modal>
    );
  }
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      updateUser: bindActionCreators(userActions.updateUserRequest, dispatch),
    },
  };
}
export default connect(null, mapDispatchToProps)(EditProfileModal);
