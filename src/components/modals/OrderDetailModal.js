import React from "react";
import { Modal, Button, Media, Image } from "react-bootstrap";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import * as orderActions from "../../redux/actions/orderActions";

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
  render() {
    console.log("order detail modal :", this.props.orderDetails);
    const { orderDetails } = this.props;
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
              console.log("modal product :", product);
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
                    {/* {this.props.image ? (
                <Image
                  className={"mr-3 rounded-pill "}
                  src="http://206.189.55.20:8080/preview/276ce05d-837b-4aa1-8f6f-ff02597a0e01/sf/x_file?_fai=8"
                  alt=""
                  width="50"
                  height="50"
                />
              ) : (
                <div className="mr-3">
                  <Icofont
                    icon="ui-press"
                    className={"text-danger food-item"}
                  />
                </div>
              )} */}
                    <Media.Body>
                      <h6 className="mb-1">
                        {product.name}
                        {/* {this.props.showBadge ? (
                    <Badge variant={this.props.badgeVariant}>
                      {this.props.badgeText}
                    </Badge>
                  ) : (
                    ""
                  )} */}
                      </h6>
                      <p className="text-gray mb-0">{"£ " + orderDetail.price}</p>
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

          {/* Total Price : 100 $ */}
          {/* <Form>
            <div className="form-row">
              <Form.Group className="col-md-12">
                <Form.Label>Phone number</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue="+91 85680-79956"
                  placeholder="Enter Phone number"
                />
              </Form.Group>
              <Form.Group className="col-md-12">
                <Form.Label>Email id</Form.Label>
                <Form.Control
                  type="text"
                  defaultValue="iamosahan@gmail.com"
                  placeholder="Enter Email id
                        "
                />
              </Form.Group>
              <Form.Group className="col-md-12 mb-0">
                <Form.Label>Password</Form.Label>
                <Form.Control
                  type="password"
                  defaultValue="**********"
                  placeholder="Enter password
                        "
                />
              </Form.Group>
            </div>
          </Form> */}
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
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadOrderDetail: bindActionCreators(
        orderActions.loadOrderDetailRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(OrderDetailModal);
