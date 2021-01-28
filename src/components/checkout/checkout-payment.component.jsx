import ChoosePaymentCard from "../common/choose-payment-card.component";
import Icofont from "react-icofont";
import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCustomerPaymentMethods } from "../../redux/customer/customer.reselect";

const CheckoutPayment = ({ customerPaymentMethods, CreateOrder }) => (
  <div className="bg-white rounded shadow-sm p-4 osahan-payment">
    <h4 className="mb-1">Choose payment method</h4>
    <br></br>
    {customerPaymentMethods.map((customerPaymentMethod) => (
      <ChoosePaymentCard
        customerPaymentId={customerPaymentMethod}
        key={customerPaymentMethod}
      />
    ))}
    <button
      onClick={() => CreateOrder()}
      className="btn btn-success btn-block btn-lg"
    >
      Order <Icofont icon="long-arrow-right" />
    </button>
  </div>
);
const mapStateToProps = createStructuredSelector({
  customerPaymentMethods: selectCustomerPaymentMethods,
});
export default connect(mapStateToProps)(CheckoutPayment);