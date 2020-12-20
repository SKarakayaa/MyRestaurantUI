import * as commentActions from "../../redux/actions/commentActions";

import { Button, Form, Modal } from "react-bootstrap";
import React, { Component } from "react";

import StarRating from "../common/StarRating";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class UpdateCommentModal extends Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: this.props.comment.comment,
      flavor: this.props.comment.flavor,
      tfrm_customer_comments_id: this.props.comment.frm_customer_comments_id,
      customer_id: this.props.comment.customer_id,
      comment_date: this.props.comment.comment_date,
      user_id: this.props.comment.user_id,
    };
  }
  HandleChange = (event) => {
    this.setState({ comment: event.target.value });
  };
  HandlePoint = (point) => {
    this.setState({ flavor: point });
  };
  HandleSubmit = (event) => {
    event.preventDefault();
    this.props.actions.updateComment(this.state);
    this.setState({
      comment: "",
      flavor: "",
      tfrm_customer_comments_id: "",
      customer_id: "",
      comment_date: "",
      user_id: "",
    });
    alertify.success("Comment is updated !");
    this.props.onHide();
  };
  render() {
    return (
      <Modal
        show={this.props.show}
        size="m"
        onHide={this.props.onHide}
        centered
      >
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            Edit Comment
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.HandleSubmit}>
          <Modal.Body>
            <h5 className="mb-4">Leave Comment</h5>
            <p className="mb-2">Rate the Place</p>
            <div className="mb-4">
              <div className="star-rating">
                <StarRating
                  fontSize={26}
                  star={parseInt(this.state.flavor)}
                  handlePoint={this.HandlePoint}
                />
              </div>
            </div>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                value={this.state.comment}
                onChange={this.HandleChange}
                name="comment"
                id="comment"
              />
            </Form.Group>
            <Form.Group>
              <Button variant="primary" size="sm" type="submit">
                {" "}
                Submit Comment{" "}
              </Button>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button
              type="button"
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
      updateComment: bindActionCreators(
        commentActions.updateCustomerCommentRequest,
        dispatch
      ),
    },
  };
}
export default connect(null, mapDispatchToProps)(UpdateCommentModal);
