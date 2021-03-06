import { Button, Form } from "react-bootstrap";

import AuthHelper from "../../helpers/authHelper";
import CommentHelper from "../../helpers/commentHelper";
import React from "react";
import StarRating from "./star-rating.component";
import Translate from '../../utilities/translator'
import {TranslatePlaceholder} from '../../utilities/translator-placeholder'
import alertify from "alertifyjs";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchCustomerCommentAddAsync } from "../../redux/comment/comment.actions";
import { selectCustomerId } from "../../redux/customer/customer.reselect";

class LeaveComment extends React.Component {
  state = {
    flavor: 0,
    comment: "",
    user_id: AuthHelper.GetCurrentUser().userId,
    customer_id: this.props.customerId,
    comment_date: new Date(),
  };
  handlePoint = (point) => this.setState({ flavor: point });
  handleSubmit = (event) => {
    event.preventDefault();
    if (CommentHelper.ValidateCommentModel(this.state)) {
      this.props.addComment(this.state);
      alertify.success(TranslatePlaceholder("Comment is successfull !"));
    } else {
      alertify.error(TranslatePlaceholder("Please don't leave empty point and comment !"));
    }
  };
  render() {
    return (
      <div className="bg-white rounded shadow-sm p-4 mb-5 rating-review-select-page">
        <h5 className="mb-4"><Translate>Leave Comment</Translate></h5>
        <p className="mb-2"><Translate>Rate the Place</Translate></p>
        <div className="mb-4">
          <div className="star-rating">
            <StarRating
              fontSize={26}
              star={this.state.flavor}
              handlePoint={this.handlePoint}
            />
          </div>
        </div>

        <Form onSubmit={this.handleSubmit}>
          <Form.Group>
            <Form.Label><Translate>Your Comment</Translate></Form.Label>
            <Form.Control
              as="textarea"
              rows={5}
              onChange={(e) => this.setState({ comment: e.target.value })}
            />
          </Form.Group>
          <Form.Group>
            <Button variant="primary" size="sm" type="submit">
              <Translate>Submit Comment</Translate>
            </Button>
          </Form.Group>
        </Form>
      </div>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  customerId: selectCustomerId,
});
const mapDispatchToProps = (dispatch) => ({
  addComment: (comment) => dispatch(fetchCustomerCommentAddAsync(comment)),
});
export default connect(mapStateToProps, mapDispatchToProps)(LeaveComment);
