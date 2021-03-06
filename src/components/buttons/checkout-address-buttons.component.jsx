import {
  selectCustomerInfo,
  selectPriceOfAreas,
} from "../../redux/customer/customer.reselect";

import React from "react";
import Translate from "../../utilities/translator";
import { chooseAddress } from "../../redux/order/order.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectCartTotal } from "../../redux/cart/cart.reselect";
import { selectChoosedAddress } from "../../redux/order/order.reselect";

const CheckoutButtons = ({
  address,
  choosedAddress,
  chooseAddress,
  priceOfAreas,
  cartTotal,
  customerInfo,
}) => {
  const isExistAddress = priceOfAreas.find(
    (x) => x.neighborhoods_id === address.neighborhoods_id
  );
  return (
    <>
      {isExistAddress ? (
        parseInt(isExistAddress.min_price) <= cartTotal ? (
          <button
            className="btn btn-sm btn-success mr-2"
            onClick={() => chooseAddress(address)}
          >
            <Translate>DELIVER HERE</Translate>
          </button>
        ) : (
          <span style={{ color: 'red' }}>
            <Translate>Minimum Price to Deliver :</Translate>{" "}
            {isExistAddress.min_price} {customerInfo.currency_unit}
          </span>
        )
      ) : (
        <span>
          <Translate>Restaurant has no deliver here</Translate>
        </span>
      )}

      {choosedAddress !== null &&
        address.frm_user_adress_id === choosedAddress.frm_user_adress_id && (
          <button className="btn btn-sm btn-primary mr-2">
            <Translate>CHOOSED</Translate>
          </button>
        )}
    </>
  );
};
const mapStateToProps = createStructuredSelector({
  choosedAddress: selectChoosedAddress,
  priceOfAreas: selectPriceOfAreas,
  cartTotal: selectCartTotal,
  customerInfo: selectCustomerInfo,
});
const mapDispatchToProps = (dispatch) => ({
  chooseAddress: (addressid) => dispatch(chooseAddress(addressid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutButtons);
