import { Card, Media } from "react-bootstrap";
import React, { Fragment } from "react";

import AddressHelper from "../../helpers/addressHelper";
import Icofont from "react-icofont";
import { Link } from "react-router-dom";

const AddressCard = ({ address, cardType }) => (
  <Card
    className={"bg-white addresses-item mb-4 border border-primary shadow"}
    style={{ height: 170 }}
  >
    <div className="gold-members p-4">
      {cardType === "address-info" ? (
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
                {address.delivery_area +
                  " - " +
                  address.delivery_instructions +
                  " - " +
                  address.location}
              </p>

              <p className="mb-0 text-black font-weight-bold">
                <Link
                  className="text-primary mr-3"
                  to="#"
                  //   onClick={this.props.onEditClick}
                >
                  <Icofont icon="ui-edit" /> EDIT
                </Link>
                <Link
                  className="text-danger"
                  to="#"
                  //   onClick={this.props.onDeleteClick}
                >
                  <Icofont icon="ui-delete" /> DELETE
                </Link>
              </p>
            </div>
          </Media>
        </Fragment>
      ) : (
        <Link
          //   onClick={this.props.onAddClick}
          to="#"
          className="text-danger"
          style={{ fontSize: 80 }}
        >
          <Icofont icon="ui-add" /> ADD
        </Link>
      )}
    </div>
  </Card>
);
export default AddressCard;
