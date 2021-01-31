import { Link } from "react-router-dom";
import React from "react";
import Translate from "../../utilities/translator";
import UpdateCommentModal from "../modals/update-comment.component";
class CommentButtons extends React.Component {
  state = {
    showModal: false,
  };
  onHide = () => this.setState({ showModal: false });
  render() {
    const { showModal } = this.state;
    const { comment } = this.props;
    return (
      <>
        {showModal && (
          <UpdateCommentModal
            show={showModal}
            onHide={this.onHide}
            comment={comment}
          />
        )}
        <Link
          to="#"
          className="w-100 mt-4 font-weight-bold ml-2"
          onClick={() => this.setState({ showModal: true })}
        >
          <i className="icofont-ui-edit"></i> <Translate>Edit</Translate>
        </Link>
        &emsp;
        <Link to="#" className="w-100 mt-4 font-weight-bold ml-2">
          <i className="icofont-ui-delete"></i>
          <Translate>Delete</Translate>
        </Link>
      </>
    );
  }
}
export default CommentButtons;
