import * as customerActions from "../../redux/actions/customerActions";

import React, { Component } from "react";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

class PaymentChoose extends Component {
  componentDidMount() {
    const { paymentMethods, actions } = this.props;
    if (paymentMethods.length === 0) {
      actions.loadPaymentMethods();
    }
  }
  GetCustomerPaymentMethods = () => {
    const { customerInfo } = this.props;
    let customerPaymentMethods =
      Object.keys(customerInfo).length !== 0
        ? customerInfo.payment_method_id.split(",")
        : [];
    return customerPaymentMethods;
  };
  render() {
    const {
      paymentMethods,
      customerInfo,
      ChoosedPaymentMethodId,
      ChangePaymentMethodId,
    } = this.props;
    const customerPaymentMethods = this.GetCustomerPaymentMethods();
    return (
      <div className="bg-white rounded shadow-sm p-4 osahan-payment">
        <h4 className="mb-1">Choose payment method</h4>
        <br></br>
        {Object.keys(customerInfo).length !== 0
          ? customerPaymentMethods.map((customerPaymentMethodId) => {
              let paymentMethod = paymentMethods.find(
                (method) =>
                  method.frm_payment_method_id === customerPaymentMethodId
              );
              return (
                <div
                  key={customerPaymentMethodId}
                  className="border shadow-sm-sm p-4 d-flex align-items-center bg-white mb-3"
                >
                  <Icofont icon="pay" className="mr-3 icofont-3x" />
                  <div className="d-flex flex-column">
                    <h5 className="card-title">{paymentMethod.name}</h5>
                    <p className="card-text">{paymentMethod.description}</p>
                    <div className="row">
                      <Link
                        onClick={() =>
                          ChangePaymentMethodId(
                            parseInt(customerPaymentMethodId)
                          )
                        }
                        to="#"
                        className="btn btn-sm btn-warning mr-2"
                      >
                        CHOOSE PAYMENT METHOD
                      </Link>
                      {parseInt(customerPaymentMethodId) ===
                      ChoosedPaymentMethodId ? (
                        <button
                          className="btn btn-sm btn-success"
                          type="button"
                        >
                          <Icofont icon="ui-check" size="1" />
                        </button>
                      ) : (
                        ""
                      )}
                    </div>
                  </div>
                </div>
              );
            })
          : ""}
        <button
          onClick={() => this.props.CreateOrder()}
          className="btn btn-success btn-block btn-lg"
        >
          Order <Icofont icon="long-arrow-right" />
        </button>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    paymentMethods: state.paymentMethodReducer,
    customerInfo: state.customerInfoReducer,
  };
}
function mapDispatchToProps(dispatch) {
  return {
    actions: {
      loadPaymentMethods: bindActionCreators(
        customerActions.loadPaymentMethodRequest,
        dispatch
      ),
    },
  };
}
export default connect(mapStateToProps, mapDispatchToProps)(PaymentChoose);
