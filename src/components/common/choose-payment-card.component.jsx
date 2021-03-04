import {
  selectChoosedPaymentMethodId,
  selectPaymentMethod,
} from "../../redux/order/order.reselect";

import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import React from "react";
import Translate from '../../utilities/translator';
import { choosePaymentMethod } from "../../redux/order/order.actions";
import { connect } from "react-redux";

const ChoosePaymentCard = ({
  choosedPaymentMethodId,
  paymentMethod,
  choosePaymentMethod,
  customerPaymentId,
}) => (
  <div className="border shadow-sm-sm p-4 d-flex align-items-center bg-white mb-3">
    <Icofont icon="pay" className="mr-3 icofont-3x" />
    <div className="d-flex flex-column">
      <h5 className="card-title">{paymentMethod.name}</h5>
      <p className="card-text">{paymentMethod.description}</p>
      <div className="row">
        <Link
          onClick={() => choosePaymentMethod(customerPaymentId)}
          to="#"
          className="btn btn-sm btn-warning mr-2"
        >
          <Translate> CHOOSE PAYMENT METHOD</Translate>
        </Link>
        {choosedPaymentMethodId === customerPaymentId && (
          <button className="btn btn-sm btn-success" type="button">
            <Icofont icon="ui-check" size="1" />
          </button>
        )}
      </div>
    </div>
  </div>
);

const mapStateToProps = (state, ownProps) => ({
  paymentMethod: selectPaymentMethod(ownProps.customerPaymentId)(state),
  choosedPaymentMethodId: selectChoosedPaymentMethodId(state),
});
const mapDispatchToProps = (dispatch) => ({
  choosePaymentMethod: (paymentMethodId) =>
    dispatch(choosePaymentMethod(paymentMethodId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChoosePaymentCard);
