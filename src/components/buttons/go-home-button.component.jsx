import GoHomeModal from "../modals/go-home-modal.component";
import { Nav } from "react-bootstrap";
import React from "react";
import Translate from "../../utilities/translator";

class GoHomeButton extends React.Component {
  state = {
    isShow: false,
  };
  onHide = () => this.setState({ isShow: false });
  render() {
    const { isShow } = this.state;
    return (
      <>
        {isShow && <GoHomeModal show={isShow} onHide={this.onHide} />}
        <Nav.Link eventKey={1} onClick={() => this.setState({ isShow: true })}>
          <Translate>Home</Translate>
        </Nav.Link>
      </>
    );
  }
}
export default GoHomeButton;
