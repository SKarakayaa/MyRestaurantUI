import { Link, Redirect } from "react-router-dom";

import GoHomeModal from "../modals/go-home-modal.component";
import { Nav } from "react-bootstrap";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { leaveRestaurantPage } from "../../redux/main/main.actions";
import { selectIsLeaveRestaurantPage } from "../../redux/main/main.reselect";
import { selectIsMainSite } from "../../redux/customer/customer.reselect";

class GoHomeButton extends React.Component {
  state = {
    isShow: false,
  };
  onHide = () => this.setState({ isShow: false });
  onLeave = () => {
    const { leaveRestaurantPage } = this.props;
    this.setState({ isShow: false });
    leaveRestaurantPage();
  };
  render() {
    const { isShow } = this.state;
    const { isLeave, isMainSite } = this.props;
    return isLeave ? (
      <Redirect to="/" />
    ) : (
      <>
        {isShow && (
          <GoHomeModal
            show={isShow}
            onLeave={this.onLeave}
            onHide={this.onHide}
          />
        )}
        {isMainSite ? (
          <Nav.Link
            eventKey={1}
            onClick={() => this.setState({ isShow: true })}
          >
            <Translate>Home</Translate>
          </Nav.Link>
        ) : (
          <Nav.Link eventKey={1} as={Link} to="/">
            <Translate>Home</Translate>
          </Nav.Link>
        )}
      </>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  isLeave: selectIsLeaveRestaurantPage,
  isMainSite: selectIsMainSite,
});
const mapDispatchToProps = (dispatch) => ({
  leaveRestaurantPage: () => dispatch(leaveRestaurantPage()),
});
export default connect(mapStateToProps, mapDispatchToProps)(GoHomeButton);
