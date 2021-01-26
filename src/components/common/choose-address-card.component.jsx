import { Card, Media } from "react-bootstrap";

import AddressAddUpdateButton from "../buttons/address-add-update-button.component";
import AddressHelper from "../../helpers/addressHelper";
import { Col } from "react-bootstrap";
import Icofont from "react-icofont";
import React from "react";
import { chooseAddress } from "../../redux/order/order.actions";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { selectChoosedAddressId } from "../../redux/order/order.reselect";

const ChooseAddressCard = ({
  address,
  isAdd,
  choosedAddressId,
  chooseAddress,
}) => (
  <Col md={6}>
    <Card
      style={{ height: 176 }}
      className="bg-white addresses-item mb-4 border border-success"
    >
      <div className="gold-members p-4">
        <Media>
          <div className="mr-3">
            <Icofont
              icon={AddressHelper.GetAddressIcon(address.address_type)}
              className="icofont-3x"
            />
          </div>
          <div className="media-body">
            <h6 className="mb-1 text-secondary">
              {AddressHelper.GetAddressTypeName(address.address_type)}
            </h6>
            <p className="text-black">
              {address.delivery_area}
              {!isAdd &&
                " - " +
                  address.delivery_instructions +
                  " - " +
                  address.location}
            </p>
            <p className="mb-0 text-black font-weight-bold">
              {!isAdd ? (
                <>
                  <button
                    className="btn btn-sm btn-success mr-2"
                    onClick={() => chooseAddress(address.frm_user_adress_id)}
                  >
                    DELIVER HERE
                  </button>
                  {address.frm_user_adress_id === choosedAddressId && (
                    <button className="btn btn-sm btn-primary mr-2">
                      CHOOSED
                    </button>
                  )}
                </>
              ) : (
                <AddressAddUpdateButton isAdd />
              )}
            </p>
          </div>
        </Media>
      </div>
    </Card>
  </Col>
);

const mapStateToProps = createStructuredSelector({
  choosedAddressId: selectChoosedAddressId,
});
const mapDispatchToProps = (dispatch) => ({
  chooseAddress: (addressId) => dispatch(chooseAddress(addressId)),
});
export default connect(mapStateToProps, mapDispatchToProps)(ChooseAddressCard);
