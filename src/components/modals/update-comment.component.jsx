import { Button, Form, Modal } from "react-bootstrap";

import CommentHelper from "../../helpers/commentHelper";
import React from "react";
import StarRating from "../rating-reviews/star-rating.component";
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { fetchCustomerCommentUpdateAsync } from "../../redux/comment/comment.actions";

class UpdateCommentModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      tfrm_customer_comments_id: props.comment.frm_customer_comments_id,
      flavor: props.comment.flavor,
      comment: props.comment.comment,
      user_id: props.comment.user_id,
      customer_id: props.comment.customer_id,
    };
  }
  handlePoint = (point) => this.setState({ flavor: point });
  handleSubmit = (event) => {
    event.preventDefault();
    const { onHide, updateComment } = this.props;
    if (CommentHelper.ValidateCommentModel(this.state)) {
      alertify.success("Yorum güncellendi !");
      updateComment(this.state);
      onHide();
    } else {
      alertify.error("Puan ve yorum kısmı boş bırakılamaz !");
    }
  };
  render() {
    const { show, onHide } = this.props;
    const { flavor, comment } = this.state;
    return (
      <Modal show={show} size="m" onHide={onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            Edit Comment
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <h5 className="mb-4">Leave Comment</h5>
            <p className="mb-2">Rate the Place</p>
            <div className="mb-4">
              <div className="star-rating">
                <StarRating
                  fontSize={26}
                  star={parseInt(flavor)}
                  handlePoint={this.handlePoint}
                />
              </div>
            </div>
            <Form.Group>
              <Form.Label>Your Comment</Form.Label>
              <Form.Control
                as="textarea"
                rows="5"
                value={comment}
                onChange={(e) => this.setState({ comment: e.target.value })}
                name="comment"
                id="comment"
              />
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
const mapDispatchToProps = (dispatch) => ({
  updateComment: (comment) =>
    dispatch(fetchCustomerCommentUpdateAsync(comment)),
});
export default connect(null, mapDispatchToProps)(UpdateCommentModal);
