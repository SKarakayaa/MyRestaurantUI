import { Card, Col, Media } from "react-bootstrap";
import React, { Fragment } from "react";

import AddressAddUpdateButton from "../buttons/address-add-update-button.component";
import AddressHelper from "../../helpers/addressHelper";
import CheckoutAddressButtons from "../buttons/checkout-address-buttons.component";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";
import Translate from "../../utilities/translator";
import { TranslatePlaceholder } from "../../utilities/translator-placeholder";
import { connect } from "react-redux";
import { fetchDeleteAddressAsync } from "../../redux/user/user.actions";

const AddressCard = ({ address, isAdd, isCheckout, deleteAddress }) => (
  <Col md={6}>
    <Card
      className={"bg-white addresses-item mb-4 border border-primary shadow"}
      style={{ height: 170 }}
    >
      <div className="gold-members p-4">
        <Fragment>
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
                {!isAdd
                  ? address.complate_address
                  : TranslatePlaceholder("Click to add new address")}
              </p>

              <p className="mb-0 text-black font-weight-bold">
                {!isAdd ? (
                  !isCheckout ? (
                    <>
                      <AddressAddUpdateButton address={address} isAdd={false} />
                      <Link
                        className="text-danger"
                        to="#"
                        onClick={() =>
                          deleteAddress(parseInt(address.frm_user_adress_id))
                        }
                      >
                        <Icofont icon="ui-delete" />{" "}
                        <Translate>DELETE</Translate>
                      </Link>
                    </>
                  ) : (
                    <CheckoutAddressButtons address={address} />
                  )
                ) : (
                  <AddressAddUpdateButton address={undefined} isAdd />
                )}
              </p>
            </div>
          </Media>
        </Fragment>
      </div>
    </Card>
  </Col>
);
const mapDispatchToProps = (dispatch) => ({
  deleteAddress: (addressid) => dispatch(fetchDeleteAddressAsync(addressid)),
});
export default connect(null, mapDispatchToProps)(AddressCard);
