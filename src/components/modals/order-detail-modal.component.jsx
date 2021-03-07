import { Button, Modal } from "react-bootstrap";
import {
  selectAreFetchingOrderDetails,
  selectOrderDetails,
} from "../../redux/order/order.reselect";

import AddToCartHelper from "../../helpers/addToCartHelper";
import OrderDetailModalBody from "../common/order-detail-modal-body.component";
import ProductHelper from "../../helpers/productHelper";
import React from "react";
import Translate from "../../utilities/translator";
import { addItem } from "../../redux/cart/cart.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { fetchOrderDetailStartAsync } from "../../redux/order/order.actions";
import { selectCustomerInfo } from "../../redux/customer/customer.reselect";
import { selectProducts } from "../../redux/product/product.reselect";

class OrderDetailModal extends React.Component {
  componentDidMount() {
    const { order, loadOrderDetails } = this.props;
    loadOrderDetails(order.frm_orders_id);
  }
  Reorder = () => {
    const { products, orderDetails, addItem } = this.props;
    orderDetails.forEach((orderDetail) => {
      let product = products.find(
        (product) => product.frm_product_id === orderDetail.product_id
      );
      var cartItemModel = AddToCartHelper.Reorder(orderDetail, product);
      addItem(cartItemModel);
    });
  };
  render() {
    const {
      areOrderDetailsFetching,
      orderDetails,
      products,
      customerInfo,
    } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="m"
        centered
      >
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            <Translate>Order Details</Translate>
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {!areOrderDetailsFetching &&
            orderDetails.map((orderDetail) => (
              <OrderDetailModalBody
                orderDetail={orderDetail}
                product={ProductHelper.GetProduct(
                  products,
                  orderDetail.product_id
                )}
                currency_unit={customerInfo.currency_unit}
                key={orderDetail.frm_order_detail_id}
              />
            ))}
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            onClick={this.props.onHide}
            variant="outline-primary"
            className="d-flex w-50 text-center justify-content-center"
          >
            <Translate>CANCEL</Translate>
          </Button>
          <Button
            type="button"
            variant="primary"
            className="d-flex w-50 text-center justify-content-center"
            onClick={() => this.Reorder()}
          >
            <Translate>REORDER</Translate>
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
const mapStateToProps = createStructuredSelector({
  areOrderDetailsFetching: selectAreFetchingOrderDetails,
  orderDetails: selectOrderDetails,
  products: selectProducts,
  customerInfo: selectCustomerInfo,
});
const mapDispatchToProps = (dispatch) => ({
  loadOrderDetails: (orderid) => dispatch(fetchOrderDetailStartAsync(orderid)),
  addItem: (cartItem) => dispatch(addItem(cartItem)),
});
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal);
