import { Button, Form, Modal } from "react-bootstrap";

import CommentHelper from "../../helpers/commentHelper";
import React from "react";
import StarRating from "../rating-reviews/star-rating.component";
import Translate from '../../utilities/translator';
import {TranslatePlaceholder} from '../../utilities/translator-placeholder';
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
      alertify.success(TranslatePlaceholder("Comment Updated !"));
      updateComment(this.state);
      onHide();
    } else {
      alertify.error(TranslatePlaceholder("Please don't leave empty point and comment !"));
    }
  };
  render() {
    const { show, onHide } = this.props;
    const { flavor, comment } = this.state;
    return (
      <Modal show={show} size="m" onHide={onHide} centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            <Translate>Edit</Translate>
          </Modal.Title>
        </Modal.Header>
        <Form onSubmit={this.handleSubmit}>
          <Modal.Body>
            <h5 className="mb-4"><Translate>Leave Comment</Translate></h5>
            <p className="mb-2"><Translate>Rate the Place</Translate></p>
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
              <Form.Label><Translate>Your Comment</Translate></Form.Label>
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
const mapDispatchToProps = (dispatch) => ({
  updateComment: (comment) =>
    dispatch(fetchCustomerCommentUpdateAsync(comment)),
});
export default connect(null, mapDispatchToProps)(UpdateCommentModal);
