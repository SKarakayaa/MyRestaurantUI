import React from "react";
import Translate from "../../utilities/translator";
import { chooseAddress } from "../../redux/order/order.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectChoosedAddressId } from "../../redux/order/order.reselect";

const CheckoutButtons = ({ address, choosedAddressId, chooseAddress }) => (
  <>
    <button
      className="btn btn-sm btn-success mr-2"
      onClick={() => chooseAddress(address.frm_user_adress_id)}
    >
      <Translate>DELIVER HERE</Translate>
    </button>
    {address.frm_user_adress_id === choosedAddressId && (
      <button className="btn btn-sm btn-primary mr-2">
        <Translate>CHOOSED</Translate>
      </button>
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
