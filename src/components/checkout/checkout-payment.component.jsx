import ChoosePaymentCard from "../common/choose-payment-card.component";
import Icofont from "react-icofont";
import React from "react";
import Translate from "../../utilities/translator";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartTotal } from "../../redux/cart/cart.reselect";
import { selectChoosedAddress } from "../../redux/order/order.reselect";
import { selectCustomerPaymentMethods } from "../../redux/customer/customer.reselect";
import { selectPriceOfAreas } from "../../redux/customer/customer.reselect";

const CheckoutPayment = ({
  customerPaymentMethods,
  CreateOrder,
  priceOfAreas,
  choosedAddress,
  cartTotal,
}) => {
  const isExistAddress =
    priceOfAreas.length !== 0 &&
    choosedAddress !== null &&
    priceOfAreas.find(
      (x) => x.neighborhoods_id === choosedAddress.neighborhoods_id
    );
  return isExistAddress
    ? parseInt(isExistAddress.min_price) <= cartTotal && (
        <div className="bg-white rounded shadow-sm p-4 osahan-payment">
          <h4 className="mb-1">
            <Translate>Choose payment method</Translate>
          </h4>
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
            <Translate>Order</Translate> <Icofont icon="long-arrow-right" />
          </button>
        </div>
      )
    : "";
};
const mapStateToProps = createStructuredSelector({
  customerPaymentMethods: selectCustomerPaymentMethods,
  priceOfAreas: selectPriceOfAreas,
  choosedAddress: selectChoosedAddress,
  cartTotal: selectCartTotal,
});
export default connect(mapStateToProps)(CheckoutPayment);
