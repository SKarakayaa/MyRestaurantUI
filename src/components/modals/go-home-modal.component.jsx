import { Button, Modal } from "react-bootstrap";

import React from "react";

class GoHomeModal extends React.Component {
  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="sm" centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            YOU ARE LEAVING
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          If you are leaving now, your cart will clear ! Are your sure to leave
          from restaurant ?
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="outline-primary"
            className="d-flex w-50 text-center justify-content-center"
          >
            STAY
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="d-flex w-50 text-center justify-content-center"
          >
            LEAVE
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default GoHomeModal;
