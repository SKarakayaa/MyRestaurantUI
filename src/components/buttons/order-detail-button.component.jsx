import { Fragment } from "react";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import OrderDetailModal from "../modals/order-detail-modal.component";
import React from "react";
import Translate from "../../utilities/translator";

class OrderDetailButton extends React.Component {
  state = {
    detailModalShow: false,
  };
  onHide = () => this.setState({ detailModalShow: false });
  render() {
    const { detailModalShow } = this.state;
    const { order } = this.props;
    return (
      <Fragment>
        {detailModalShow && (
          <OrderDetailModal
            order={order}
            onHide={this.onHide}
            show={detailModalShow}
          />
        )}
        <Link
          className="btn btn-sm btn-primary"
          to="#"
          onClick={() => this.setState({ detailModalShow: true })}
        >
          <Icofont icon="listing-box" /> <Translate>Detail</Translate>
        </Link>
      </Fragment>
    );
  }
}
export default OrderDetailButton;
