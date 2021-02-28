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
  debugger;
  return (
    <>
      {isExistAddress ? (
        parseInt(isExistAddress.min_price) <= cartTotal ? (
          <button
            className="btn btn-sm btn-success mr-2"
            onClick={() => chooseAddress(address.frm_user_adress_id)}
          >
            <Translate>DELIVER HERE</Translate>
          </button>
        ) : (
          <span>
            Minimum Price to Deliver : {isExistAddress.min_price}{" "}
            {customerInfo.currency_unit}
          </span>
        )
      ) : (
        <span>The restaurant does not transport here</span>
      )}

      {address.frm_user_adress_id === choosedAddress.frm_user_adress_id && (
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
