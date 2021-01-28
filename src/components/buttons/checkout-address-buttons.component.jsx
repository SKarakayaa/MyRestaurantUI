import React from "react";
import { chooseAddress } from "../../redux/order/order.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectChoosedAddressId } from "../../redux/order/order.reselect";

const CheckoutButtons = ({ addressid, choosedAddressId, chooseAddress }) => (
  <>
    <button
      className="btn btn-sm btn-success mr-2"
      onClick={() => chooseAddress(addressid)}
    >
      DELIVER HERE
    </button>
    {addressid === choosedAddressId && (
      <button className="btn btn-sm btn-primary mr-2">CHOOSED</button>
    )}
  </>
);
const mapStateToProps = createStructuredSelector({
  choosedAddressId: selectChoosedAddressId,
});
const mapDispatchToProps = (dispatch) => ({
  chooseAddress: (addressid) => dispatch(chooseAddress(addressid)),
});
export default connect(mapStateToProps, mapDispatchToProps)(CheckoutButtons);
