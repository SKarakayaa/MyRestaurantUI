import { Button, Modal } from "react-bootstrap";

import React from "react";
import Translate from '../../utilities/translator';

class GoHomeModal extends React.Component {
  HandleClick = (e) => {
    e.preventDefault();
    if (e.target.name === "leave") {
      this.props.onLeave();
    } else {
      this.props.onHide();
    }
  };
  render() {
    const { show, onHide } = this.props;
    return (
      <Modal show={show} onHide={onHide} size="m" centered>
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            <Translate>YOU ARE LEAVING</Translate>
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Translate>
          If you are leaving now, your cart will clear ! Are you sure to leave
          from restaurant ?</Translate>
        </Modal.Body>
        <Modal.Footer>
          <Button
            type="button"
            variant="outline-primary"
            name="stay"
            onClick={() => this.props.onHide()}
            className="d-flex w-50 text-center justify-content-center"
          >
            <Translate>STAY</Translate>
          </Button>
          <Button
            type="submit"
            variant="primary"
            name="leave"
            onClick={() => this.props.onLeave()}
            className="d-flex w-50 text-center justify-content-center"
          >
            <Translate>LEAVE</Translate>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
export default GoHomeModal;
