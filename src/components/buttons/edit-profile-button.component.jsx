import EditProfileModal from "../modals/edit-profile-modal.component";
import { Link } from "react-router-dom";
import React from "react";

class EditProfileButton extends React.Component {
  state = {
    showModal: false,
  };
  onHide = () => this.setState({ showModal: false });
  render() {
    const { userInfo } = this.props;
    const { showModal } = this.state;
    return (
      <>
        {showModal && (
          <EditProfileModal
            show={showModal}
            userInfo={userInfo}
            onHide={this.onHide}
          />
        )}
        <Link
          to="#"
          className="text-primary mr-3"
          onClick={() => this.setState({ showModal: true })}
        >
          <i className="icofont-ui-edit"></i> EDIT
        </Link>
      </>
    );
  }
}
export default EditProfileButton;
