import * as cartActions from "../../redux/actions/cartActions";
import * as orderActions from "../../redux/actions/orderActions";

import { Button, Image, Media, Modal } from "react-bootstrap";

import React from "react";
import alertify from "alertifyjs";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class OrderDetailModal extends React.Component {
  componentDidMount() {
    this.props.actions.loadOrderDetail(this.props.orderId);
  }
  GetProduct = (productid) => {
    let product = this.props.products.find(
      (x) => x.frm_product_id === productid
    );
    return product;
  };
  AddToCart = (e) => {
    e.preventDefault();
    const { orderDetails } = this.props;
    orderDetails.forEach((orderDetail) => {
      let _product = this.GetProduct(orderDetail.product_id);
      let product = {
        frm_product_id: _product.frm_product_id,
        name: _product.name,
        price: parseInt(_product.price),
        is_menu: _product.is_menu,
        options: {
          choosenOptions:
            _product.options === undefined ? "" : _product.options,
        },
      };
      if (orderDetail.material_add !== "") {
        product.materials = {
          choosenMaterials: orderDetail.material_add,
          totalMaterialsPrice:
            parseInt(orderDetail.price) - parseInt(_product.price),
        };
      }
      this.props.actions.addToCart({ quantity: 1, product });
    });
    alertify.success("Orders has added cart !");
    this.props.onHide();
  };
  render() {
    const { orderDetails, customerInfo } = this.props;
    return (
      <Modal
        show={this.props.show}
        onHide={this.props.onHide}
        size="m"
        centered
      >
        <Modal.Header closeButton={true}>
          <Modal.Title as="h5" id="edit-profile">
            Order Detail
          </Modal.Title>
        </Modal.Header>

        <Modal.Body>
          {orderDetails &&
            orderDetails.map((orderDetail) => {
              let product = this.GetProduct(orderDetail.product_id);
              return (
                <div
                  className={"p-3 border-bottom gold-members"}
                  key={orderDetail.frm_order_detail_id}
                >
                  <Media>
                    <Image
                      className={"mr-3 rounded-pill "}
                      src={`http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=${product.photo}`}
                      alt={product.name}
                      width="50"
                      height="50"
                    />
                    <Media.Body>
                      <h6 className="mb-1">{product.name}</h6>
                      <p className="text-gray mb-0">
                        {customerInfo.currency_unit + " " + orderDetail.price}
                      </p>
                      <br />
                      <p className="text-gray mb-0">{orderDetail.options}</p>
                      <p className="text-gray mb-0">
                        {orderDetail.material_add}
                      </p>
                      <p className="text-gray mb-0">
                        {orderDetail.material_removed}
                      </p>
                    </Media.Body>
                  </Media>
                </div>
              );
            })}
        </Modal.Body>

        <Modal.Footer>
          <Button
            type="button"
            onClick={this.props.onHide}
            variant="outline-primary"
            className="d-flex w-50 text-center justify-content-center"
          >
            CANCEL
          </Button>
          <Button
            type="button"
            variant="primary"
            className="d-flex w-50 text-center justify-content-center"
            onClick={(e) => this.AddToCart(e)}
          >
            REORDER
          </Button>
        </Modal.Footer>
      </Modal>
    );
  }
}
function mapStateToProps(state) {
  return {
    orderDetails: state.orderDetailReducer,
    products: state.productReducer,
    customerInfo: state.customerInfo,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadOrderDetail: bindActionCreators(
        orderActions.loadOrderDetailRequest,
        dispatch
      ),
      addToCart: bindActionCreators(cartActions.addMenuToCart, dispatch),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal);
